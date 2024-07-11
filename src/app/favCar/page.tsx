"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import NavProfile from '../component/NavProfile'
import DashboardFavCar from '../component/DashboardFavCar'
import MyFavoriteCars from '../component/MyFavoriteCars'

interface Car {
  _id: string;
  image: string;
  modele: string;
  marque: string;
  categorie: string;
  kilometrage: number;
  typeCarburant: string;
  typeTransmission: string;
  anneeFabrication: number;
  prixParJ: number;
}

const FavCarPage = () => {
  const [activePage, setActivePage] = useState('favorites');
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [totalItems, setTotalItems] = useState(0);
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
        const [clientResponse, favoriteCarsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/users/clients/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(`http://localhost:3001/favorite-cars/client/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        setClient(clientResponse.data);
        const favoriteCars = favoriteCarsResponse.data;
        setTotalItems(favoriteCars.length);

        // Fetch car details for each favorite car
        const carDetailsPromises = favoriteCars.map((favCar: any) =>
          axios.get(`http://localhost:3001/cars/${favCar.idVoiture}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        );
        const carDetailsResponses = await Promise.all(carDetailsPromises);
        const carDetails = carDetailsResponses.map(response => response.data);
        setCars(carDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch client or data');
      }
    };

    fetchClientData();
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [router]);

  const handleItemClick = (page: string) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };
  const handleDelete = async (userId: string) => {
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

  if (!client) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client}/>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6">
          <DashboardFavCar
            client={client}
            activePage={activePage}
            handleItemClick={handleItemClick}
            handleLogout={handleLogout}
            handleDelete={handleDelete}
          />
          <MyFavoriteCars cars={cars} />
        </div>
      </div>
    </div>
  );
};

export default FavCarPage;
