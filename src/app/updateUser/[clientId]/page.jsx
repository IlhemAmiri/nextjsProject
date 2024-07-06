"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';

const UpdateUserPage = ({ params }) => {
  const [client, setClient] = useState({
    nom: '',
    prenom: '',
    email: '',
    numTel: '',
    adresse: '',
    image: null,
    CIN: '',
    passport: '',
    dateNaissance: '',
    numPermisConduire: '',
    dateExpirationPermis: '',
  });
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [activePage, setActivePage] = useState('profile');
  const router = useRouter();
  const { clientId } = params;

  useEffect(() => {
    const fetchClientData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/signin');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/users/clients/${clientId}`, {
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
        setClient({
          ...data,
          dateNaissance: data.dateNaissance ? new Date(data.dateNaissance).toISOString().split('T')[0] : '',
          dateExpirationPermis: data.dateExpirationPermis ? new Date(data.dateExpirationPermis).toISOString().split('T')[0] : ''
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClientData();
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [router, clientId]);

  const handleItemClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  const handleFileChange = (e) => {
    setClient({ ...client, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('nom', client.nom);
    formData.append('prenom', client.prenom);
    formData.append('email', client.email);
    formData.append('numTel', client.numTel);
    formData.append('adresse', client.adresse);
    formData.append('CIN', client.CIN);
    formData.append('passport', client.passport);
    formData.append('dateNaissance', client.dateNaissance);
    formData.append('numPermisConduire', client.numPermisConduire);
    formData.append('dateExpirationPermis', client.dateExpirationPermis);
    if (client.image) {
      formData.append('image', client.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/users/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update client data');
      }

      const data = await response.json();
      setClient(data);
      
      const role = localStorage.getItem('role');
      if (role === 'admin') {
        router.push('/');
      } else {
        router.push('/profile');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

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
                      <FaCar className={`inline-block mr-2 ${activePage === 'favorites' ? 'text-white' : 'text-[#1ECB15]'}`} />My Favorite Cars
                    </div>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer py-2 px-6 rounded transition bg-white text-black hover:bg-[#1ECB15] hover:text-white"
                  >
                    <FaSignOutAlt className="inline-block mr-2 text-[#1ECB15]" />Logout
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
            <h2 className="text-2xl font-semibold mb-4">Update Client Information</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    id="nom"
                    className="w-full border rounded px-3 py-2"
                    value={client.nom}
                    onChange={(e) => setClient({ ...client, nom: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    id="prenom"
                    className="w-full border rounded px-3 py-2"
                    value={client.prenom}
                    onChange={(e) => setClient({ ...client, prenom: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border rounded px-3 py-2"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className="w-full border rounded px-3 py-2"
                    value={client.numTel}
                    onChange={(e) => setClient({ ...client, numTel: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="adresse" className="block font-medium mb-2">Address</label>
                  <input
                    type="text"
                    id="adresse"
                    className="w-full border rounded px-3 py-2"
                    value={client.adresse}
                    onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="CIN" className="block font-medium mb-2">CIN</label>
                  <input
                    type="text"
                    id="CIN"
                    className="w-full border rounded px-3 py-2"
                    value={client.CIN}
                    onChange={(e) => setClient({ ...client, CIN: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="passport" className="block font-medium mb-2">Passport</label>
                  <input
                    type="text"
                    id="passport"
                    className="w-full border rounded px-3 py-2"
                    value={client.passport}
                    onChange={(e) => setClient({ ...client, passport: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="dateNaissance" className="block font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    id="dateNaissance"
                    className="w-full border rounded px-3 py-2"
                    value={client.dateNaissance}
                    onChange={(e) => setClient({ ...client, dateNaissance: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="numPermisConduire" className="block font-medium mb-2">Driver's License Number</label>
                  <input
                    type="text"
                    id="numPermisConduire"
                    className="w-full border rounded px-3 py-2"
                    value={client.numPermisConduire}
                    onChange={(e) => setClient({ ...client, numPermisConduire: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="dateExpirationPermis" className="block font-medium mb-2">Driver's License Expiry Date</label>
                  <input
                    type="date"
                    id="dateExpirationPermis"
                    className="w-full border rounded px-3 py-2"
                    value={client.dateExpirationPermis}
                    onChange={(e) => setClient({ ...client, dateExpirationPermis: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block font-medium mb-2">Profile Picture</label>
                  <input
                    type="file"
                    id="image"
                    className="w-full border rounded px-3 py-2"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleUpdate}
                className="mt-6 w-full bg-[#1ECB15] text-white py-2 px-4 rounded transition-transform hover:scale-105"
              >
                Update Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
