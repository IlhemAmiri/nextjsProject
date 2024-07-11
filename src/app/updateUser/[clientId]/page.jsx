"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavProfile from '../../component/NavProfile';
import UpdateUserInfo from '../../component/UpdateUserInfo';

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
       <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client}/>
       <UpdateUserInfo
        client={client}
        setClient={setClient}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        error={error}
        activePage={activePage}
        handleItemClick={handleItemClick}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default UpdateUserPage;
