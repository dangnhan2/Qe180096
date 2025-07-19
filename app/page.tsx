'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  group?: string;
};

export default function HomePage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('');
  const [sort, setSort] = useState('asc');

  const fetchContacts = async () => {
    const res = await fetch(`/api/contacts?search=${search}&group=${group}&sort=${sort}`);
    const data = await res.json();
    setContacts(data);
  };

  const deleteContact = async (id: string) => {
    if (confirm('Xác nhận xoá?')) {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      fetchContacts();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search, group, sort]);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Danh sách liên hệ</h1>
      <div className="mb-4 flex gap-2">
        <input
          className="border px-2 py-1"
          placeholder="Tìm kiếm theo tên"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="border px-2 py-1">
          <option value="">Tất cả nhóm</option>
          <option value="Friends">Friends</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-2 py-1">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <Link href="/add-contact" className="bg-blue-500 text-white px-4 py-1 rounded">
          + Thêm
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Tên</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">SĐT</th>
            <th className="border px-2">Nhóm</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td className="border px-2">{c.name}</td>
              <td className="border px-2">{c.email}</td>
              <td className="border px-2">{c.phone || '-'}</td>
              <td className="border px-2">{c.group || '-'}</td>
              <td className="border px-2">
                <Link href={`/edit-contacts/${c._id}`} className="text-blue-600 mr-2">Sửa</Link>
                <button onClick={() => deleteContact(c._id)} className="text-red-600">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}