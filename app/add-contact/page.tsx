'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', group: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const phoneRegex = /^(0|\+84)[1-9][0-9]{8}$/;
  if (form.phone && !phoneRegex.test(form.phone)) {
    alert('Số điện thoại không hợp lệ (phải đủ 10 số và bắt đầu bằng 0 hoặc +84)');
    return;
  }
  const res = await fetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message); // hiện cảnh báo
    return;
  }

  router.push('/');
};

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Thêm liên hệ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Tên" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} className="border px-2 py-1 w-full" />
        <input required type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} className="border px-2 py-1 w-full" />
        <input placeholder="SĐT" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} className="border px-2 py-1 w-full" />
        <select value={form.group} onChange={e => setForm({ ...form, group: e.target.value })}
          className="border px-2 py-1 w-full">
          <option value="">Chọn nhóm</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Lưu</button>
      </form>
    </main>
  );
}