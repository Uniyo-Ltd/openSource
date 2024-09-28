'use client';

import { useEffect, useState } from 'react';

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
        <li>
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 text-center"
          >
            Prev
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button 
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 text-center ${
                page === currentPage ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-colors duration-200 text-center"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        console.log('Fetching users...');
        const response = await fetch(`/api/users?offset=${(currentPage - 1) * 10}`);
        console.log('Response received:', response);
        const data = await response.json();
        console.log('Parsed data:', data);
        setUsers(data.users || []);
        console.log('Updated users:', users);
        setTotal(data.totalCount);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]); // This effect will run whenever currentPage changes

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
           <thead className="bg-gray-100">
             <tr>
               <th className="px-4 py-2 text-left">ID</th>
               <th className="px-4 py-2 text-left">Name</th>
               <th className="px-4 py-2 text-left">Email</th>
               <th className="px-4 py-2 text-left">Created At</th>
             </tr>
           </thead>
           <tbody>
             {users.map((user, index) => (
               <tr key={user.id} className={` ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                 <td className="px-4 py-2">{user.id}</td>
                 <td className="px-4 py-2">{user.name}</td>
                 <td className="px-4 py-2">{user.email}</td>
                 <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
               </tr>
             ))}
           </tbody>
         </table>
          <Pagination
            total={total}
            limit={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}