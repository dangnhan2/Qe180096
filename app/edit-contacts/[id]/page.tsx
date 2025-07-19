'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditContactPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    group: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`/api/contacts/${id}`);
        const data = await res.json();

        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          group: data.group || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact', error);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/');
  };

   if (loading) return <p className="p-4">Đang tải...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa liên hệ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
        <input
          name="phone"
          placeholder="SĐT"
          value={form.phone}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        />
        <select
          name="group"
          value={form.group}
          onChange={handleChange}
          className="border px-2 py-1 w-full"
        >
          <option value="">Chọn nhóm</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-1 rounded">Cập nhật</button>
      </form>
    </main>
  );
}
