"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    CIN: '',
    passport: '',
    adresse: '',
    numTel: '',
    dateNaissance: '',
    numPermisConduire: '',
    dateExpirationPermis: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMounted) return;

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register: ${errorText}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      router.push('/signin');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message || 'Failed to register');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-[url('/images/signin.png')]">
      <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center w-full px-6 lg:px-12 py-4 shadow-md">
        <div className="flex justify-center">
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
        <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 pr-6 w-full">
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
      <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg p-8 my-10">
        <h2 className="text-[#020202] font-outfit font-semibold text-2xl mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="CIN" className="block text-sm font-medium text-gray-700">CIN</label>
            <input
              type="text"
              id="CIN"
              name="CIN"
              value={formData.CIN}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passport" className="block text-sm font-medium text-gray-700">Passport</label>
            <input
              type="text"
              id="passport"
              name="passport"
              value={formData.passport}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numTel" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="numTel"
              name="numTel"
              value={formData.numTel}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="numPermisConduire" className="block text-sm font-medium text-gray-700">Driver's License Number</label>
            <input
              type="text"
              id="numPermisConduire"
              name="numPermisConduire"
              value={formData.numPermisConduire}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateExpirationPermis" className="block text-sm font-medium text-gray-700">Driver's License Expiration Date</label>
            <input
              type="date"
              id="dateExpirationPermis"
              name="dateExpirationPermis"
              value={formData.dateExpirationPermis}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#17a714] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17a714]"
            >
              Sign Up
            </button>
          </div>
        </form>
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
            <Link href="/signin">
              <div className=" font-inter font-normal text-[14px] leading-[19.36px] cursor-pointer">
                Already have an account? <span className='text-[#1ECB15]'> Sign in</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Signup;
