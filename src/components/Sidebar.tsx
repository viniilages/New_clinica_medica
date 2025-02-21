import React from 'react';
import Link from 'next/link';
import { Home, Users, Calendar } from 'lucide-react';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="w-15 h-screen bg-gray-100 border-r border-gray-300 flex flex-col p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/" className={`flex items-center space-x-3 p-2 rounded-lg transition ${
              isActive('/') ? 'bg-[#A672FF] text-white' : 'text-gray-700 hover:text-indigo-600'
            }`}>

            <Home size={20} />

          </Link>
        </li>
        <li>
          <Link href="/contatos" className={`flex items-center space-x-3 p-2 rounded-lg transition ${
              isActive('/contatos') ? 'bg-[#A672FF] text-white' : 'text-gray-700 hover:text-indigo-600'
            }`}>

            <Users size={20} />

          </Link>
        </li>
        <li>
          <Link href="/agenda" className={`flex items-center space-x-3 p-2 rounded-lg transition ${
              isActive('/agenda') ? 'bg-[#A672FF] text-white' : 'text-gray-700 hover:text-indigo-600'
            }`}>

            <Calendar size={20} />

          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
