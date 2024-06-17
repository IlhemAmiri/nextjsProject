"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use next/navigation for App Router
import axios from 'axios';
import Link from 'next/link';

interface Car {
  _id: string;
  marque: string;
  modele: string;
  anneeFabrication: number;
  typeCarburant: string;
  typeTransmission: string;
  categorie: string;
  disponibilite: string;
  kilometrage: number;
  NbPlaces: number;
  NbPortes: number;
  climatisation: boolean;
  caracteristiques: string;
  accessoiresOptionSupp: string;
  prixParJ: number;
  image: string;
  conditionDeLocation: string;
  note?: number;
  offrePromotion: string;
}
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
          </svg>
        ))}
      {halfStar && (
        <svg
          className="w-6 h-6 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
        </svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
          </svg>
        ))}
    </div>
  );
};


const CarDetailsPage = () => {
  const { carId } = useParams(); // Use useParams to get URL parameters
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (carId) {
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/cars/${carId}`);
          setCar(response.data);
          setLoading(false);
        } catch (error) {
          console.error('There was an error fetching the car details!', error);
          setLoading(false);
        }
      };

      fetchCarDetails();
      const authStatus = localStorage.getItem('isAuth') === 'true';
      setIsAuth(authStatus);
    }
  }, [carId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };



  return (
    <div>
      <div className="relative h-[380px]">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/11.jpg')]">
          <div className="absolute inset-0">
            <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex justify-center">
                <a href="#">
                  <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <nav className="flex space-x-16">
                  <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</a>
                  <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</a>
                  <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</a>
                </nav>
              </div>
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <Link href="/signin">
                  <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                    Sign In
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-[12%] py-[2%] bg-gray-100">
        <h1 className="text-center text-3xl font-bold my-8 pb-8">My Orders</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <img src={car.image} alt={car.modele} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src={car.image} alt={car.modele} className="w-full h-40 object-cover rounded-lg shadow-lg" />
              <img src={car.image} alt={car.modele} className="w-full h-40 object-cover rounded-lg shadow-lg" />
              <img src={car.image} alt={car.modele} className="w-full h-40 object-cover rounded-lg shadow-lg" />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-2 text-center py-4">{car.marque} {car.modele} {car.anneeFabrication}</h2>
            <p className="text-xl text-gray-700 mb-4 text-center">Daily rate</p>
            <p className="text-[50px] font-bold text-center">${car.prixParJ}</p>
            <p className="mb-4">{car.caracteristiques}</p>
            <h3 className="text-xl font-semibold mb-2">Specifications</h3>
            <ul className="mb-4 divide-y divide-gray-300">
              <li className="flex justify-between py-2"><span>Seats</span><span className='font-bold'>{car.NbPlaces} seats</span></li>
              <li className="flex justify-between py-2"><span>Doors</span><span className='font-bold'>{car.NbPortes} doors</span></li>
              <li className="flex justify-between py-2"><span>Mileage</span><span className='font-bold'>{car.kilometrage} km</span></li>
              <li className="flex justify-between py-2"><span>Fuel Type</span><span className='font-bold'>{car.typeCarburant}</span></li>
              <li className="flex justify-between py-2"><span>Engine</span><span className='font-bold'>{car.kilometrage}</span></li>
              <li className="flex justify-between py-2"><span>Year</span><span className='font-bold '>{car.anneeFabrication}</span></li>
              <li className="flex justify-between py-2"><span>Transmission</span><span className='font-bold '>{car.typeTransmission}</span></li>
              <li className="flex justify-between py-2"><span>Category</span><span className='font-bold'>{car.categorie}</span></li>
              <li className="flex justify-between py-2"><span>Availability</span><span className='font-bold'>{car.disponibilite}</span></li>
              <li className="flex justify-between py-2"><span>AC</span><span className='font-bold'>{car.climatisation ? 'Yes' : 'No'}</span></li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Additional Accessories</h3>
            <p className="mb-4">{car.accessoiresOptionSupp}</p>
            <h3 className="text-xl font-semibold mb-2">Rental Conditions</h3>
            <p className="mb-4">{car.conditionDeLocation}</p>
            {car.offrePromotion && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Promotional Offer</h3>
                <p className="mb-4">{car.offrePromotion}</p>
              </div>
            )}
            {car.note && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Rating</h3>
                <StarRating rating={car.note} />
              </div>
            )}
            <div className="mt-8">
              <Link href={`/reservation/${carId}`}>
                <div className="bg-[#1ECB15] text-white text-center px-4 py-2 rounded shadow-md hover:bg-[#17a413] transition cursor-pointer">
                  Reserve
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
