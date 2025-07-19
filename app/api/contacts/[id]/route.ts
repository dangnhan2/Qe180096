import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/db';
import { Contact } from '@/lib/models/Contact';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  await connectMongo();
  const { id } = context.params;

  const contact = await Contact.findById(id);
  if (!contact) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json(contact);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectMongo();
  const { id } = context.params;
  const data = await req.json();

  const existing = await Contact.findOne({
    _id: { $ne: id },
    $or: [
      { email: data.email },
      { phone: data.phone },
    ],
  });

  if (existing) {
    return NextResponse.json(
      { message: 'Email hoặc số điện thoại đã tồn tại' },
      { status: 400 }
    );
  }

  const updated = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectMongo();
  const { id } = context.params;

  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json({ message: 'Deleted' });
}
