import { connectMongo } from '@/lib/db';
import { Contact } from '@/lib/models/Contact';

import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectMongo();
  const data = await req.json();

  // Kiểm tra email hoặc phone trùng với người khác (trừ chính nó)
  const existing = await Contact.findOne({
    $and: [
      { _id: { $ne: params.id } },
      {
        $or: [
          { email: data.email },
          { phone: data.phone },
        ]
      }
    ]
  });

  if (existing) {
    return NextResponse.json(
      { message: 'Email hoặc số điện thoại đã tồn tại' },
      { status: 400 }
    );
  }

  const updated = await Contact.findByIdAndUpdate(params.id, data, { new: true });
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectMongo();
  const deleted = await Contact.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectMongo();
  const contact = await Contact.findById(params.id);
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(contact);
}