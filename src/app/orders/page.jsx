"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import NavProfile from '../component/NavProfile'


const OrderPage = () => {
  const [activePage, setActivePage] = useState('orders');
  const [client, setClient] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
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
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [router]);

  const handleItemClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
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
      completed: 'bg-[#00B74A] text-white rounded-full text-[14px]',
      cancelled: 'bg-[#F93154] text-white rounded-full text-[14px]',
      scheduled: 'bg-[#FFA900] text-white rounded-full text-[14px]'
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
      <div key={reservation._id} className="block lg:table-row mb-4 text-[15px] lg:mb-0">
        <div className="block lg:table-cell p-2 font-bold">{index + 1}</div>
        <div className="block lg:table-cell p-2 font-bold">{reservation.idVoiture ? `${reservation.idVoiture.marque} ${reservation.idVoiture.modele}` : 'Car details not available'}</div>
        <div className="block lg:table-cell p-2">{reservation.lieuRamassage}</div>
        <div className="block lg:table-cell p-2">{reservation.destination}</div>
        <div className="block lg:table-cell p-2">{formatDate(reservation.dateDebut)}</div>
        <div className="block lg:table-cell p-2">{formatDate(reservation.dateFin)}</div>
        <div className="block lg:table-cell p-2">{reservation.tarifTotale} $</div>
        <div className="block lg:table-cell p-2">{reservation.chauffeur ? 'Yes' : 'No'}</div>
        <div className="block lg:table-cell p-2">{reservation.commentaire}</div>
        <div className="block lg:table-cell p-2">{renderOrderStatus(reservation.status)}</div>
      </div>
    ));
  };

  return (
    <div>
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6">
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/5 flex flex-col items-center max-h-[600px]">
            <img src={client.image} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" width={128} height={128} />
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
                  <Link href="/favCar">
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
    <h2 className="font-bold mt-4 text-[20px] p-4 text-center">{title}</h2>
    <div className="table-responsive">
      <div className="lg:table w-full mt-2 mb-4 divide-y divide-gray-300">
        <div className="text-[#ACACAC] text-[15px] hidden lg:table-row">
          <div className="lg:table-cell p-1 font-normal">#</div>
          <div className="lg:table-cell p-1 font-normal">Car Name</div>
          <div className="lg:table-cell p-1 font-normal">Pick Up Location</div>
          <div className="lg:table-cell p-1 font-normal">Drop Off Location</div>
          <div className="lg:table-cell p-1 font-normal">Pick Up Date</div>
          <div className="lg:table-cell p-1 font-normal">Return Date</div>
          <div className="lg:table-cell p-1 font-normal">Total Cost</div>
          <div className="lg:table-cell p-1 font-normal">With Driver</div>
          <div className="lg:table-cell p-1 font-normal">Comment</div>
          <div className="lg:table-cell p-1 font-normal">Status</div>
        </div>
        <div className="lg:table-row-group">
          {renderOrders(status)}
        </div>
      </div>
    </div>
  </div>
);

export default OrderPage;
