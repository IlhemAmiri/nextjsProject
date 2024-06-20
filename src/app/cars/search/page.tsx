"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
  };

  return (
    <div>
          <div className="h-[400px] bg-cover bg-center bg-[url('/images/11.jpg')]">
      <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
        <div className="flex justify-center">
          <a href="#">
            <img src="/images/Container.png" alt="Logo" className='w-40 h-14' />
          </a>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex space-x-4 lg:space-x-20">
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
            <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Booking</a>
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blog</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">FAQ</a>
          </nav>
        </div>
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {isAuth ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <Link href="/signin">
            <div className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
              Sign In
            </div>
          </Link>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 items-end pr-6">
          <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Home</a>
          <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Cars</a>
          <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a>
          <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
          <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blog</a>
          <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQ</a>
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link href="/signin">
              <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                Sign In
              </div>
            </Link>
          )}
        </div>
      )}
      </div>
      <div className="bg-gray-100 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold">Explore All Vehicles {marque}</h2>
        </div>
        <div className="px-[10%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="relative">
                <img src={car.image} alt={car.modele} className="rounded-t-lg w-full h-56 object-cover" />
                <div className="absolute top-5 left-5 bg-[#1ECB15] text-white rounded-full px-4 py-1 text-sm">
                  Great Price
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <button className="mt-2">
                    <img src="/images/save.png" alt="Save" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{car.marque} {car.modele}</h3>
                <p className="text-sm mt-2">{car.categorie}</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center">
                    <img src="/images/Miles.png" alt="Miles" className="mr-2" />
                    <span className="text-sm">{car.kilometrage} Miles</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/images/Petrol.png" alt="Petrol" className="mr-2" />
                    <span className="text-sm">{car.typeCarburant}</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/images/Automatic.png" alt="Automatic" className="mr-2" />
                    <span className="text-sm">{car.typeTransmission}</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/images/cal.png" alt="Calendar" className="mr-2" />
                    <span className="text-sm">{car.anneeFabrication}</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${car.prixParJ}</span>
                  <Link href={`/detailsCar/${car._id}`}>
                    <div className="text-[#1ECB15] text-sm flex items-center cursor-pointer">
                      View Details <FaArrowUp className="ml-1 rotate-45" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;

