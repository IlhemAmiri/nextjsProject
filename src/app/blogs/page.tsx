"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Blog {
    _id: string;
    title: string;
    author: string;
    date: string;
    category: string;
    image: string;
    summary: string;
}

const PageBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isAuth, setIsAuth] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 12;
    const [totalBlogs, setTotalBlogs] = useState(0);

    const router = useRouter();

    useEffect(() => {
        // Fetch blogs from API
        const fetchBlogs = async (page: number) => {
            try {
                const res = await axios.get(`http://localhost:3001/blogs?page=${page}&limit=${blogsPerPage}`);
                setBlogs(res.data.data);
                setTotalBlogs(res.data.total);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };

        fetchBlogs(currentPage);

        // Check authentication status from local storage
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
    }, [currentPage]);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    
    return (
        <div>
            <div className="h-[400px] bg-cover bg-center bg-[url('/images/11.jpg')]">
                <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
                    <div className="flex justify-center">
                        <a href="#">
                            <img src="/images/Container.png" alt="Logo" className='w-40 h-14' />
                        </a>
                    </div>
                    <div className="hidden md:flex flex-1 justify-center">
                        <nav className="flex space-x-4 lg:space-x-20">
                            <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
                            <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
                            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Booking</a>
                            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
                            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blog</a>
                            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">FAQ</a>
                        </nav>
                    </div>
                    <div className="md:hidden flex items-center ml-auto">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    {isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/signin">
                            <div className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                                Sign In
                            </div>
                        </Link>
                    )}
                </div>
                {menuOpen && (
                    <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 pr-6">
                        <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Home</a>
                        <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Cars</a>
                        <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a>
                        <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
                        <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blog</a>
                        <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQ</a>
                        {isAuth ? (
                            <button
                                onClick={handleLogout}
                                className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link href="/signin">
                                <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                                    Sign In
                                </div>
                            </Link>
                        )}
                    </div>
                )}
            </div>
            <div className="bg-gray-100 px-20 pt-12 pb-[150px]">
                <div className="text-center">
                    <h2 className="text-[#050B20] font-dm-sans text-4xl font-bold leading-tight py-2 pb-20">
                      Blog Posts
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {blogs.map(blog => (
                        <div key={blog._id} className="w-full max-w-[463px] mx-auto">
                            <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white shadow-lg">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                                    <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">{blog.category}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">{blog.author} · {formatDate(blog.date)}</p>
                                <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">{blog.summary}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <div className="flex justify-center items-center mt-8 pb-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`w-[36px] h-[36px] rounded-l-md ${currentPage === 1 ? 'opacity-0 ' : ''}`}
                    >
                        ←
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const newPage = index + 1;
                                setCurrentPage(newPage);
                                localStorage.setItem('currentPage', newPage.toString());
                            }}
                            className={`w-[36px] h-[36px] ${index + 1 === currentPage ? 'bg-[#1ECB15] text-white' : 'bg-transparent text-black'} rounded-md mx-1`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`w-[36px] h-[36px] rounded-r-md ${currentPage === totalPages ? 'opacity-0' : ''}`}
                    >
                        →
                    </button>
                </div>
        </div>
    );
};

export default PageBlogs;