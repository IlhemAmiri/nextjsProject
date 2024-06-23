"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [activePage, setActivePage] = useState('profile');
  const router = useRouter();

  useEffect(() => {
    const fetchClientData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/signin');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/users/clients/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }

        const data = await response.json();
        setClient(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClientData();
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [router]);

  const handleItemClick = (page) => {
    setActivePage(page); // Met à jour la page active lors du clic sur un élément
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };




  return (
    <div>
      <div className="h-[400px] bg-cover bg-center bg-[url('/images/road.jpg')]">
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
      <div className="flex justify-center py-12 bg-gray-100">
        <div className="w-full max-w-7xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6  pl-[2.5%]">
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/4 flex flex-col items-center">
            <img src={client.image} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" />
            <h2 className="text-xl font-semibold mt-4 text-center">{client.nom} {client.prenom}</h2>
            <p>{client.email}</p>
            <nav className="mt-6 w-full">
              <ul className="space-y-2">
                <li>
                  <Link href="/profile">
                    <div
                      onClick={() => handleItemClick('profile')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'profile' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                        }`}
                    >
                      <FaUser className={`inline-block mr-2 ${activePage === 'profile' ? 'text-white' : 'text-[#1ECB15]'}`} />My Profile
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/orders">
                    <div
                      onClick={() => handleItemClick('orders')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'orders' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                        }`}
                    >
                      <FaCalendar className={`inline-block mr-2 ${activePage === 'orders' ? 'text-white' : 'text-[#1ECB15]'}`} />My Orders
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <div
                      onClick={() => handleItemClick('favorites')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'favorites' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                        }`}
                    >
                      <FaCar className={`inline-block mr-2 ${activePage === 'favorites' ? 'text-white' : 'text-[#1ECB15]'}`} /> My Favorite Cars
                    </div>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-white text-black cursor-pointer py-2 px-6">
                    <FaSignOutAlt className="inline-block mr-2 text-[#1ECB15]" /> Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="flex mb-4">
              <div className="text-center cursor-pointer border-b-2 border-[#1ECB15] text-[#1ECB15] font-semibold px-4">Profile</div>
              <div className="text-center cursor-pointer border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 px-4">Notifications</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input type="email" value={client.email} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">CIN</label>
                  <input type="text" value={client.CIN} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Passport</label>
                  <input type="text" value={client.passport} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input type="text" value={client.adresse} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input type="text" value={client.numTel} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Date of Birth</label>
                  <input type="date" value={new Date(client.dateNaissance).toISOString().substring(0, 10)} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Driver's License Number</label>
                  <input type="text" value={client.numPermisConduire} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700">Driver's License Expiry Date</label>
                  <input type="date" value={new Date(client.dateExpirationPermis).toISOString().substring(0, 10)} className="mt-1 p-2 w-full border rounded-md" readOnly />
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-[#1ECB15] text-white font-bold py-2 px-6 rounded hover:bg-[#17ab12] transition">Update Profile</button>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default ProfilePage;