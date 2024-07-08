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
  const marque = searchParams.get('marque');
  const router = useRouter();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (marque) {
          const response = await axios.get(`http://localhost:3001/cars/search/search?marque=${marque}`);
          setCars(response.data);
        }
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
      } catch (error) {
        console.error('There was an error fetching the car data!', error);
      }
    };
    fetchCars();
  }, [marque]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  return (
    <div>
      <NavCars isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SearchCar cars={cars} marque={marque} />
    </div>
  );
};

export default SearchResultsPage;

