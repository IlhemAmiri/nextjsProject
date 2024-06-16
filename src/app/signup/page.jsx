"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
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
    <div className="relative h-[1700px]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/signin.png')" }}>
        <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="flex justify-center">
            <Link href="#">
              <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-16">
              <Link href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</Link>
              <Link href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</Link>
              <Link href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</Link>
              <Link href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</Link>
              <Link href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</Link>
              <Link href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</Link>
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
        <div className="w-[909.33px] h-[auto] bg-white rounded-[4.8px] shadow-[0px_30px_60px_0px_#0013570F] p-10">
          <h2 className="text-[#020202] font-outfit font-semibold text-[20px] leading-[26px] tracking-[-0.2px] mb-6">Create an Account</h2>
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
            {/* Add other fields similarly */}
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
              <label htmlFor="dateExpirationPermis" className="block text-sm font-medium text-gray-700">Driver's License Expiry Date</label>
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
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="w-full h-[45.19px] mt-[15px] p-[3.4px_0px_4.59px_0px] rounded-[4.8px] bg-[#1ECB15] text-white font-inter font-bold text-[16px] leading-[19.36px]">Sign Up</button>
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
                Already have an account? Sign in
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
