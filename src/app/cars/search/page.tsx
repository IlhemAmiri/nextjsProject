"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import NavCars from '../../component/NavCars';
import SearchCar from '../../component/SearchCar';
import { useRouter } from 'next/navigation';


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

const SearchResultsPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const searchParams = useSearchParams();
  const [client, setClient] = useState(null);
  const [userId, setUserId] = useState<string | null>(null);

  const marque = searchParams.get('marque');
  const router = useRouter();
  useEffect(() => {
    const fetchClientData = async (userId: string, token: string) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/clients/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setClient(response.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    const fetchCars = async () => {
      try {
        if (marque) {
          const response = await axios.get(`http://localhost:3001/cars/search/search?marque=${marque}`);
          setCars(response.data);
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
    const storedUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (storedUserId) {
      setUserId(storedUserId);
      if (authStatus && token) {
        fetchClientData(storedUserId, token);
      }
    }

    fetchCars();
  }, [marque]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  return (
    <div>
      <NavCars isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client} />
      <SearchCar cars={cars} marque={marque} />
    </div>
  );
};

export default SearchResultsPage;

