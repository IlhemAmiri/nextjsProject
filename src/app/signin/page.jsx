"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async () => {
    if (!isMounted) return;

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userId', data.userId);
      router.push('/');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-cover bg-center bg-[url('/images/signin.png')]">
        <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
          {/* <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"> si t7eb padding x*/}          <div className="flex justify-center">
            <a href="#">
              <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
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
          <Link href="/signin">
            <div className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
              Sign In
            </div>
          </Link>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 pr-6">
            <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Home</a>
            <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Cars</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a>
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blog</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQ</a>
            <Link href="/signin">
              <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                Sign In
              </div>
            </Link>
          </div>
        )}
        <div className="flex flex-col items-center justify-center flex-1 my-16">
          <div className="w-[409.33px] h-[468.75px] bg-white rounded-[4.8px] shadow-[0px_30px_60px_0px_#0013570F]">
            <div className="p-10">
              <h2 className="text-[#020202] font-outfit font-semibold text-[20px] leading-[26px] tracking-[-0.2px]">Login</h2>
              <input
                type="email"
                placeholder="Your Address Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[329.33px] h-[45.59px] mt-10 p-[12px_10px_13.59px_10px] rounded-[6px] bg-[#00000006] border-[2px] border-[#EEEEEE] text-[#757575] font-inter font-normal text-[16px] leading-[19.36px] placeholder-[#757575]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[329.33px] h-[45.59px] mt-[10px] p-[12px_10px_13.59px_10px] rounded-[6px] bg-[#00000006] border-[2px] border-[#EEEEEE] text-[#757575] font-inter font-normal text-[16px] leading-[19.36px] placeholder-[#757575]"
              />
              {error && <p>{error}</p>}
              <button onClick={handleLogin} className="w-[329.33px] h-[45.19px] mt-[15px] p-[3.4px_0px_4.59px_0px] rounded-[4.8px] bg-[#1ECB15] text-white font-inter font-bold text-[16px] leading-[19.36px]">Sign In</button>
              <div className="flex items-center mt-[40px]">
                <div className="flex-grow border-t border-[#000000] opacity-20"></div>
                <span className="mx-4 text-[#404040] font-inter font-normal text-[14px] leading-[27.2px] tracking-[-0.2px]">Or sign up with</span>
                <div className="flex-grow border-t border-[#000000] opacity-20"></div>
              </div>
              <div className="flex justify-between mt-[20px] mb-4">
                <button className="w-[160.66px] h-[39.19px] p-[5.4px_10px_6.59px_10px] rounded-[5px] bg-[#F2F2F2] flex items-center">
                  <img src="/images/google.png" alt="Google" className="mr-[16.9px]" />
                  <span className="font-bold">Google</span>
                </button>
                <button className="w-[160.66px] h-[39.19px] p-[5.4px_10px_6.59px_10px] rounded-[5px] bg-[#F2F2F2] flex items-center">
                  <img src="/images/facebook1.png" alt="Facebook" className="mr-[10px]" />
                  <span className="font-bold">Facebook</span>
                </button>
              </div>
              <div className="text-center mt-6">
                <Link href="/signup">
                  <div className=" font-inter font-normal text-[14px] leading-[19.36px] cursor-pointer">
                    Don't have an account? <span className='text-[#1ECB15]'>Create one</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Page;
