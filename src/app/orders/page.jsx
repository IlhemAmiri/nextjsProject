"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const OrderPage = () => {
  const [activePage, setActivePage] = useState('orders');
  const [client, setClient] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
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
        const [clientResponse, reservationsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/users/clients/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(`http://localhost:3001/reservations/client/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        setClient(clientResponse.data);
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch client or reservations data');
      }
    };

    fetchClientData();
  }, [router]);

  const handleItemClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/signin');
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  const renderOrderStatus = (status) => {
    const statusMap = {
      confirmer: 'completed',
      annuler: 'cancelled',
      'en Attent': 'scheduled'
    };

    const statusClassMap = {
      completed: 'bg-[#00B74A]  text-white rounded-[800px] text-[14px]',
      cancelled: 'bg-[#F93154] text-white rounded-[800px] text-[14px]',
      scheduled: 'bg-[#FFA900] text-white rounded-[800px] text-[14px]'
    };

    return (
      <span className={`px-2 py-1 rounded ${statusClassMap[statusMap[status]]}`}>{statusMap[status]}</span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  const renderOrders = (status) => {
    return reservations.filter(reservation => reservation.status === status).map((reservation, index) => (
      <tr key={reservation._id} className="text-center text-[14px]">
        <td className="p-2 font-bold">{index + 1}</td>
        <td className="p-2 font-bold">{reservation.idVoiture ? `${reservation.idVoiture.marque} ${reservation.idVoiture.modele}` : 'Car details not available'}</td>
        <td className="p-2">{formatDate(reservation.dateDebut)}</td>
        <td className="p-2">{formatDate(reservation.dateFin)}</td>
        <td className="p-2">{reservation.tarifTotale} $ </td>
        <td className="p-2">{reservation.chauffeur ? 'Yes' : 'No'}</td>
        <td className="p-2">{reservation.commentaire}</td>
        <td className="p-2">{renderOrderStatus(reservation.status)}</td>
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[380px]">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/road.jpg')]">
          <div className="absolute inset-0">
            <div className="text-white flex justify-between items-center px-[12%] h-[102px]">
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
              <button
                onClick={handleLogout}
                className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-12 bg-gray-100">
        <div className="w-full max-w-7xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/4 flex flex-col items-center max-h-[600px]">
            <img src={client.image} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" width={128} height={128} />
            <h2 className="text-xl font-semibold mt-4 text-center">{client.nom} {client.prenom}</h2>
            <p>{client.email}</p>
            <nav className="mt-6 w-full">
              <ul className="space-y-2">
                <li>
                  <Link href="/profile">
                    <div
                      onClick={() => handleItemClick('profile')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${
                        activePage === 'profile' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
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
                      className={`cursor-pointer py-2 px-6 rounded transition ${
                        activePage === 'orders' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
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
                      className={`cursor-pointer py-2 px-6 rounded transition ${
                        activePage === 'favorites' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
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
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <OrderSection title="Scheduled Orders" status="en Attent" renderOrders={renderOrders} />
            <OrderSection title="Completed Orders" status="confirmer" renderOrders={renderOrders} />
            <OrderSection title="Cancelled Orders" status="annuler" renderOrders={renderOrders} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSection = ({ title, status, renderOrders }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
    <h2 className="font-bold mt-4 text-[25px] p-4 text-center">{title}</h2>
    <table className="table-auto w-full mt-2 mb-4 divide-y divide-gray-300">
      <thead>
        <tr className='text-[#ACACAC] text-[12px]'>
          <th className="p-2 font-normal">#</th>
          <th className="p-2 font-normal">Car</th>
          <th className="p-2 font-normal">Start Date</th>
          <th className="p-2 font-normal">End Date</th>
          <th className="p-2 font-normal">Total Cost</th>
          <th className="p-2 font-normal">With Driver</th>
          <th className="p-2 font-normal">Comment</th>
          <th className="p-2 font-normal">Status</th>
        </tr>
      </thead>
      <tbody>
        {renderOrders(status)}
      </tbody>
    </table>
  </div>
);

export default OrderPage;
