import { connectMongo } from '@/lib/db';
import { Contact } from '@/lib/models/Contact';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const group = searchParams.get('group');
  const sort = searchParams.get('sort'); // asc / desc

  const filter: any = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (group) filter.group = group;

  const contacts = await Contact.find(filter).sort({ name: sort === 'desc' ? -1 : 1 });
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  await connectMongo();
  const data = await req.json();

  // Kiểm tra trùng email hoặc số điện thoại
  const existing = await Contact.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (existing) {
    return NextResponse.json(
      { message: 'Email hoặc số điện thoại đã tồn tại' },
      { status: 400 }
    );
  }

  const contact = await Contact.create(data);
  return NextResponse.json(contact, { status: 201 });
}