"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavProfile from '../component/NavProfile'
import DashboardProfile from '../component/DashboardProfile'
import FormProfile from '../component/FormProfile';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/images/loading.gif" alt="Loading..." className="w-[250px]" />
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
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
  return (
    <div>
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client} />
      <div className="flex justify-center py-12 bg-gray-100">
        <div className="w-full max-w-7xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6  pl-[2.5%]">
          <DashboardProfile
            client={client}
            activePage={activePage}
            handleItemClick={handleItemClick}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
          />
          <FormProfile client={client} />
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default ProfilePage;