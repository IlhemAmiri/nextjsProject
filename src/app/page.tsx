"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OurVehicle from './component/OurVehicle';
import AccueilHome from './component/AccueilHome';
import Customers from './component/Customers';
import WhyChooseUs from './component/WhyChooseUs';
import OurFeatures from './component/OurFeatures';
import Quality from './component/Quality';
import PremiumBrands from './component/PremiumBrands';

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


const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios.get('http://localhost:3001/cars?page=1&limit=4')
      .then(response => {
        console.log(response.data);
        setCars(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  return (
    <div>
      <AccueilHome isAuth={isAuth} handleLogout={handleLogout} />
      <OurVehicle cars={cars} />
      <Customers />
      <WhyChooseUs />
      <OurFeatures />
      <Quality />
      <PremiumBrands />    
      {/* New Section */}
      <div className="bg-gray-100 px-20 pt-12 pb-[150px]">
        <div className="text-center mb-8">
          <h2 className="text-[#050B20] font-dm-sans text-4xl font-bold leading-tight py-12 pb-20">
            Latest Blog Posts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          <div className="w-full max-w-[463px] mx-auto">
            <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white">
              <img src="/images/post1.jpg" alt="Blog Post 1" className="w-full h-full object-cover" />
              <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">Sound</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">Admin · November 22, 2023</p>
              <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">2024 BMW ALPINA XB7 with exclusive details, extraordinary</h3>
            </div>
          </div>
          <div className="w-full max-w-[463px] mx-auto">
            <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white">
              <img src="/images/post2.jpg" alt="Blog Post 2" className="w-full h-full object-cover" />
              <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">Accessories</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">Admin · November 22, 2023</p>
              <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">BMW X6 M50i is designed to exceed your sportiest.</h3>
            </div>
          </div>
          <div className="w-full max-w-[463px] mx-auto">
            <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white">
              <img src="/images/post3.jpg" alt="Blog Post 3" className="w-full h-full object-cover" />
              <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">Exterior</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">Admin · November 22, 2023</p>
              <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">BMW X5 Gold 2024 Sport Review: Light on Sport</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
