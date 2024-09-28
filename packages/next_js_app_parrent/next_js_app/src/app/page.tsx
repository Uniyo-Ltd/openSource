'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ total, limit, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-6">
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <Link href={`/users?page=${page}`} onClick={() => onPageChange(page)} className="px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 text-center">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('Fetching users...');
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log('API Response:', data);
        setUsers(data.users || []);
        setTotal(data.totalCount);
        console.log('Users fetched:', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  async function fetchUsers(page: number) {
    setLoading(true);
    try {
      const response = await fetch(`/api/users?offset=${
        (page - 1) * 10
      }`);
      const data = await response.json();
      setUsers(data.users || []);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center">
                No users found
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2 text-center">
                <Link href={`/users/${user.id}`}
                  className="text-blue-600 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        total={total}
        limit={10}
        currentPage={1}
        onPageChange={(page) => fetchUsers(page)}
      />
    </div>
  );
}