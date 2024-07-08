"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import MakePayment from '../component/MakePayment';


interface Reservation {
  tarifTotale: number;
}

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [error, setError] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReservation = async () => {
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
        router.push('/orders');
      } else {
        setError('Payment failed');
      }
    } catch (error) {
      console.error('Error making payment:', error);
      setError('Payment failed');
    }
  };

  return (
    <div>
      <MakePayment
        reservation={reservation}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handlePayment={handlePayment}
        error={error}
      />
    </div>
  );
};

export default PaymentPage;
