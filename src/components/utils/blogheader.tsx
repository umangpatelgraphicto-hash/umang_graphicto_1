'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";

type HeaderProps = {
  title: string;
  content: string;
};

const Header: React.FC<HeaderProps> = ({ }) => {
     const [isDropdownOpen, setDropdownOpen] = useState(false);
     const router = useRouter();
  return (
    <header className="bg-gray-100 pb-20 w-full ">
    <div className="container  mx-auto flex flex-col md:flex-row  justify-between px-4 md:px-28 py-4 relative ">
      <div className="flex justify-between ">
       <Image
             src="/logo/logo.png"
             alt="logo"
             width={180}
             height={100}
             className="mb-4 cursor-pointer"
             onClick={() => router.push("/intro")}
           />
       
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="md:hidden ml-4 text-gray-700 hover:text-blue-600"
        >
          <Image src="/icon/dropdown.png" alt="Menu" width={20} height={20} />
        </button>
      </div>

    
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 z-10 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-blue-500 font-bold"><Image src="/logo/logo.png" alt="logo" width={100} height={60}></Image></h3>
            <button onClick={() => setDropdownOpen(false)}>
              <Image src="/icon/dropdown.png"  alt="Close" width={20} height={20} />
            </button>
          </div>
          <nav className="flex flex-col items-center mt-2">
            <Link href="/templateshome" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
              Templates
            </Link>
            <Link href="/pricing" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
              Pricing
            </Link>
            <Link href="/blog" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
              Blog
            </Link>
            <div className="flex flex-col mt-2">
              <Link
                href="/login"
                className="block w-full text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500 px-4 py-2 mb-2 text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block w-full text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500 px-4 py-2 text-center"
              >
                Signup
              </Link>
            </div>
          </nav>
        </div>
      )}

    
      <nav className="hidden md:flex flex-row items-center space-x-6 mt-4 md:mt-0">
        <Link href="/templateshome" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
          Templates
        </Link>
        <Link href="/pricing" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
          Pricing
        </Link>
        <Link href="/blog" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
          Blog
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-6 py-2 text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500"
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
    </header>
  );
};

export default Header;