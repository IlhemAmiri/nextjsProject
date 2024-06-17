"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

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
      localStorage.setItem('userId',  data.userId);
      router.push('/');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="relative h-[1090px]">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/signin.png')]">
        <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="flex justify-center">
            <a href="#">
              <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-16">
              <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</a>
              <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</a>
            </nav>
          </div>
          <Link href="/signin">
            <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
              Sign In
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div className="w-[409.33px] h-[468.75px] bg-white rounded-[4.8px] shadow-[0px_30px_60px_0px_#0013570F] ">
          <div className="relative p-10">
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
            <div className="relative flex items-center mt-[40px]">
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
                  Don't have an account? Create one
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;