import React from 'react';
import Link from 'next/link';

const NavCars = ({ isAuth, handleLogout, menuOpen, setMenuOpen, client }) => {
    return (
        <div className="h-[400px] bg-cover bg-center bg-[url('/images/11.jpg')]">
            <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
                <div className="flex justify-center">
                    <a href="/">
                        <img src="/images/Container.png" alt="Logo" className='w-[120px]' />
                    </a>
                </div>
                <div className="hidden md:flex flex-1 justify-center">
                    <nav className="flex space-x-4 lg:space-x-20">
                        <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
                        <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
                        <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
                        <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blogs</a>
                        <a href="/faq" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">FAQs</a>
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
                    <div className="hidden md:flex items-center">
                        {client && (
                            <a href="/profile">
                            <img src={client.image ? client.image : '/images/avatar.png'} alt="Profile" className="rounded-full w-10 h-10 mr-4 border-2 border-[#1ECB15]" />
                            </a>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
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
                    <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
                    <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blogs</a>
                    <a href="/faq" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQs</a>
                    {client && (
                        <a href="/profile">
                        <img src={client.image ? client.image : '/images/avatar.png'} alt="Profile" className="rounded-full w-8 h-8 mr-4 border-2 border-[#1ECB15]" />
                        </a>
                    )}
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
    );
};

export default NavCars;