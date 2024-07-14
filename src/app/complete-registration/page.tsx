"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CompleteRegistration = ({ userId }: { userId: string }) => {
  const [cin, setCin] = useState('');
  const [passport, setPassport] = useState('');
  const [dateExpirationPermis, setDateExpirationPermis] = useState('');
  const [numPermisConduire, setNumPermisConduire] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [numTel, setNumTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleCompleteRegistration = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auth/complete-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          cin,
          passport,
          dateExpirationPermis,
          numPermisConduire,
          dateNaissance,
          numTel,
          adresse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful', data);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Complete Registration</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleCompleteRegistration(); }}>
          <input
            type="text"
            placeholder="CIN"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Passport"
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="date"
            placeholder="Date Expiration Permis"
            value={dateExpirationPermis}
            onChange={(e) => setDateExpirationPermis(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Num Permis Conduire"
            value={numPermisConduire}
            onChange={(e) => setNumPermisConduire(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="date"
            placeholder="Date Naissance"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Num Tel"
            value={numTel}
            onChange={(e) => setNumTel(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Complete Registration</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistration;
