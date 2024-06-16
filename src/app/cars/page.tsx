"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';

interface Car {
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

const Page = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    // Récupérer la page actuelle depuis le localStorage ou définir à 1 par défaut
    return parseInt(localStorage.getItem('currentPage') || '1', 10);
  });
  const [itemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cars?page=${currentPage}&limit=${itemsPerPage}`);
        setCars(response.data.data); // Adjusted to match the response structure
        setTotalItems(response.data.total); // Adjusted to match the response structure
      } catch (error) {
        console.error('There was an error fetching the car data!', error);
      }
    };

    fetchCars();

    // Check authentication status from local storage
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [currentPage, itemsPerPage]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      localStorage.setItem('currentPage', nextPage.toString()); // Stocker la page actuelle
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      localStorage.setItem('currentPage', prevPage.toString()); // Stocker la page actuelle
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page.toString()); // Stocker la page actuelle
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
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
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

      <div className="bg-gray-100">
        <div className="text-center pt-12">
          <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px]">Explore All Vehicles</h2>
        </div>
        <div className="pt-16 px-[10%] flex">
          <div className="w-[336px] h-auto mr-12">
            <div className="bg-white p-6 rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6 ">
              <h3 className="font-semibold">Vehicle Type</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" /> Car</label>
                <label><input type="checkbox" /> Van</label>
                <label><input type="checkbox" /> Minibus</label>
                <label><input type="checkbox" /> Prestige</label>
              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
              <h3 className="font-semibold">Car Body Type</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" /> Convertible</label>
                <label><input type="checkbox" /> Coupe</label>
                <label><input type="checkbox" /> Exotic Cars</label>
                <label><input type="checkbox" /> Hatchback</label>
                <label><input type="checkbox" /> Minivan</label>
                <label><input type="checkbox" /> Truck</label>
                <label><input type="checkbox" /> Sedan</label>
                <label><input type="checkbox" /> Sports Car</label>
                <label><input type="checkbox" /> Station Wagon</label>
                <label><input type="checkbox" /> SUV</label>
              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
              <h3 className="font-semibold">Car Seats</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" /> 2 seats</label>
                <label><input type="checkbox" /> 4 seats</label>
                <label><input type="checkbox" /> 6 seats</label>
                <label><input type="checkbox" /> 6+ seats</label>
              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33]">
              <h3 className="font-semibold">Price ($)</h3>
              <div className="flex items-center gap-2 mt-2">
                <input type="range" min="0" max="195" className="w-full" />
                <span>$0 - $195</span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(cars) && cars.map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md mb-20 transition-transform transform hover:scale-105 min-h-[300px] max-h-[450px]">
                <div className="relative">
                  <img src={car.image} alt={car.modele} className="rounded-t-lg w-full h-[218.33px] object-cover" />
                  <div className="absolute top-[20.05px] left-[20px] bg-[#1ECB15] text-white rounded-[30px] px-[15px] py-[2.94px] text-sm">
                    Great Price
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <button className="mt-2">
                      <img src="/images/save.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-dm-sans text-[18px] font-bold leading-[21.6px]">{car.marque} {car.modele}</h3>
                  <p className="font-dm-sans text-[14px] leading-[14px] mt-2">{car.categorie}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center">
                      <img src="/images/Miles.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.kilometrage} Miles</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Petrol.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.typeCarburant}</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Automatic.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.typeTransmission}</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/cal.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.anneeFabrication}</span>
                    </div>
                  </div>
                  <hr className="my-4 border-[#E9E9E9]" />
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-dm-sans text-[20px] font-bold leading-[30px]">${car.prixParJ}</span>
                    <Link href={`/details`}>
                      <div className="text-[#1ECB15] text-sm flex items-center text-[15px] cursor-pointer">
                        View Details <FaArrowUp className="ml-1 rotate-45" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 pb-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`w-[218.7px] h-[36px] rounded-l-md ${currentPage === 1 ? 'opacity-0 ' : ''}`}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                const newPage = index + 1;
                setCurrentPage(newPage);
                localStorage.setItem('currentPage', newPage.toString()); // Stocker la page actuelle
              }}
              className={`w-[32px] h-[36px] ${index + 1 === currentPage ? 'bg-[#1ECB15] text-white' : 'bg-transparent text-black'} rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-[218.7px] h-[36px] rounded-r-md ${currentPage === totalPages ? 'opacity-0' : ''}`}
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Page;
