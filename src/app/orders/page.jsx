"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardFavCar from '../component/DashboardFavCar';
import axios from 'axios';
import NavProfile from '../component/NavProfile';
import OrderSection from '../component/OrderSection';
import { FaCreditCard } from 'react-icons/fa';

const OrderPage = () => {
  const [activePage, setActivePage] = useState('orders');
  const [client, setClient] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [showPastReservations, setShowPastReservations] = useState(false);
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
        const clientResponse = await axios.get(`http://localhost:3001/users/clients/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setClient(clientResponse.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
        setError('Failed to fetch client data');
      }
    };

    const fetchReservationsData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const reservationsResponse = await axios.get(`http://localhost:3001/reservations/client/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error('Error fetching reservations data:', error);
        setError('');
      }
    };

    fetchClientData();
    fetchReservationsData();
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

  const handlePayClick = (reservationId) => {
    localStorage.setItem('reservationId', reservationId);
    router.push('/payment');
  };

  const fetchPaymentStatus = async (reservationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/payments/${reservationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.status === 'payee';
    } catch (error) {
      console.error('Error fetching payment status:', error);
      return false;
    }
  };

  const renderOrders = (status) => {
    const now = new Date();
    const filteredReservations = reservations.filter(reservation => reservation.status === status && new Date(reservation.dateDebut) >= now);

    if (filteredReservations.length === 0) {
      return null;
    }

    return filteredReservations.map((reservation, index) => (
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
        {status === 'confirmer' && (
          <div className="block lg:table-cell p-2">
            {reservation.statusPaiement === 'payee' ? (
              <span className='text-[9px]'>Already paid and confirmed</span>
            ) : reservation.statusPaiement === 'en attente' ? (
              <span className='text-[9px]'>Already paid awaiting for admin confirmation</span>
            ) : (
              <button
                onClick={() => handlePayClick(reservation._id)}
                className="bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 transition duration-200"
              >
                <FaCreditCard size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    ));
  };

  const renderPastOrders = () => {
    const now = new Date();
    const pastReservations = reservations.filter(reservation => new Date(reservation.dateDebut) < now);

    if (pastReservations.length === 0) {
      return null;
    }

    return pastReservations.map((reservation, index) => (
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

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/users/clients/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete client');
      }

      alert(`Le client avec l'identifiant ${userId} a été supprimé`);
      localStorage.clear();
      router.push('/signup');
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the client');
    }
  };

  const isAllSectionsEmpty = () => {
    const now = new Date();
    const scheduledReservations = reservations.filter(reservation => reservation.status === 'en Attent' && new Date(reservation.dateDebut) >= now);
    const completedReservations = reservations.filter(reservation => reservation.status === 'confirmer' && new Date(reservation.dateDebut) >= now);
    const cancelledReservations = reservations.filter(reservation => reservation.status === 'annuler' && new Date(reservation.dateDebut) >= now);
    const pastReservations = reservations.filter(reservation => new Date(reservation.dateDebut) < now);

    return (
      scheduledReservations.length === 0 &&
      completedReservations.length === 0 &&
      cancelledReservations.length === 0 &&
      pastReservations.length === 0
    );
  };

  return (
    <div>
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client} />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6">
          <DashboardFavCar
            client={client}
            activePage={activePage}
            handleItemClick={handleItemClick}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
          />
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {isAllSectionsEmpty() ? (
              <div className='className="text-gray-700"'>You have no reservations at the moment.</div>
            ) : (
              <>
                <OrderSection title="Scheduled Orders" status="en Attent" renderOrders={renderOrders} />
                <OrderSection title="Completed Orders" status="confirmer" renderOrders={renderOrders} />
                <OrderSection title="Cancelled Orders" status="annuler" renderOrders={renderOrders} />
                <h2 className="text-xl font-semibold mb-4 mt-8">Past Reservations</h2>
                <div>
                  <button
                    onClick={() => setShowPastReservations(!showPastReservations)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200"
                  >
                    {showPastReservations ? 'Hide' : 'Show'} Past Reservations
                  </button>
                  {showPastReservations && <OrderSection title="Past Reservations" status="past" renderOrders={renderPastOrders} />}
                </div>
              </>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
