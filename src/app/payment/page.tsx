"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaCreditCard } from 'react-icons/fa';

interface Reservation {
  tarifTotale: number;
  // Ajoutez d'autres propriétés ici si nécessaire
}

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [error, setError] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReservation = async () => {
      const reservationId = localStorage.getItem('reservationId'); // Assurez-vous que l'ID de réservation est stocké lors de la navigation vers cette page
      const token = localStorage.getItem('token'); // Récupérez le token

      if (!reservationId) {
        setError('Reservation ID is missing');
        return;
      }

      if (!token) {
        setError('Authentication token is missing');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/reservations/${reservationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setReservation(response.data);
        } else {
          setError('Failed to fetch reservation details');
        }
      } catch (error) {
        console.error('Error fetching reservation:', error);
        setError('Failed to fetch reservation details');
      }
    };

    fetchReservation();
  }, []);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reservationId = localStorage.getItem('reservationId');
    const token = localStorage.getItem('token');

    if (!reservationId) {
      setError('Reservation ID is missing');
      return;
    }

    if (!token) {
      setError('Authentication token is missing');
      return;
    }

    if (paymentMethod === 'card') {
      setError('The procedures for card payments are not yet completed.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/payments',
        {
          idReservation: reservationId,
          methodePaiement: paymentMethod,
          status: 'payee',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Payment successful');
        router.push('/orders'); // Redirigez l'utilisateur vers la page des commandes après le paiement
      } else {
        setError('Payment failed');
      }
    } catch (error) {
      console.error('Error making payment:', error);
      setError('Payment failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Make a Payment</h2>
        {reservation ? (
          <div>
            <p className="text-lg font-medium text-gray-700">Total Price: {reservation.tarifTotale} €</p>
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1ECB15] focus:border-[#1ECB15] sm:text-sm"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ECB15] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
              >
                <FaCreditCard className="mr-2" /> Pay
              </button>
            </form>
          </div>
        ) : (
          <p>Loading reservation details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
