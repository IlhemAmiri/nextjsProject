"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AddBlogPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin');
        if (role !== 'admin') {
            router.push('/');
        }

        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
        // Automatically set the date to today's date
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('summary', summary);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:3001/blogs', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add blog');
            }

            router.push('/blogs');
        } catch (error) {
            setError('Failed to add blog');
        }
    };

    if (!isMounted || !isAdmin) {
        return null;
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    return (
        <div>
            <div className="h-[300px] bg-cover bg-center bg-[url('/images/road.jpg')]">
                <div className=" text-white flex justify-between items-center px-6 lg:px-12 py-4">
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
            <div className="flex flex-col items-center justify-center flex-1 my-16">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-10">
                    <h2 className="text-gray-800 font-semibold text-2xl mb-6">Add Blog</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* <div className="col-span-2">
                            <label className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div> */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Summary</label>
                            <textarea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            ></textarea>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded-md hover:bg-[#16A314] transition-colors"
                            >
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBlogPage;