"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import CountUp from 'react-countup';

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
const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    axios.get('http://localhost:3001/cars')
      .then(response => {
        console.log(response.data); // Vérifiez les données reçues dans la console
        setCars(response.data.slice(0, 4));
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
  }, []);


  return (
    <div>
      <div className="relative h-[820px]">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/11.jpg')]">
          <div className="absolute inset-0">
            <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex justify-center">
                <a href="#">
                  <img src="/images/Container.png" alt="Logo" className='w-[156px] h-[56px]' />
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <nav className="flex space-x-16">
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</a>
                  <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</a>
                </nav>
              </div>
              <Link href="/signin">
                <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                  Sign In
                </div>
              </Link>
            </div>
            <div className="absolute top-1/3 left-[12%] w-[600px] h-[424.56px]">
              <h1 className="font-outfit font-medium text-white text-[52px] leading-[52px] tracking-[-2px] mb-8">
                Explore the world with comfortable car
              </h1>
              <p className="font-inter text-base font-normal leading-6 tracking-tight text-left text-white mb-8">
                Embark on unforgettable adventures and discover the world in unparalleled
                comfort and style with our fleet of exceptionally comfortable cars.
              </p>

              <Link href="/cars">
                <button className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-36 h-9 mt-4 font-bold text-sm tracking-wide hover:scale-105">
                  Choose a Car
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* New Section */}
      <div className="bg-gray-100">
        <div className="pt-16 px-[12%]">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px] mb-4">Our Vehicle Fleet</h2>
            <p className="font-inter text-[16px] font-normal leading-[27.2px] tracking-[-0.2px]">
              Driving your dreams to reality with an exquisite fleet of versatile vehicles for unforgettable journeys.
            </p>
          </div>
          <div className="flex justify-end mb-8">
            <Link href="/cars">
              <div className="flex items-center text-[#050B20] text-sm cursor-pointer">
                View All <img src="/images/arrow.png" alt="" className="ml-2" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {cars.map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md mb-20 transition-transform transform hover:scale-105">
                <div className="relative">
                  <img src={car.image} alt={car.modele} className="rounded-t-lg w-full h-[218.33px] object-cover" />
                  <div className="absolute top-[20.05px] left-[20px] bg-[#1ECB15] text-white rounded-[30px] px-[15px] py-[2.94px] text-sm" >
                    Great Price
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <button className='mt-2'>
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
                    <Link href="/details">
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
        {/* Nouvelle section avec une image de fond */}
        <div className="relative w-full h-[546.3px] mt-16 bg-[url('/images/Section.jpg')] bg-cover bg-center ">
          <div className="absolute inset-0 flex justify-between p-[2%]">
            <div className="flex flex-col">
              <h2 className="font-outfit text-[42px] mt-[50px] font-semibold leading-[50px] tracking-[-1.8px] text-left text-white pl-[100px]">
                We offer customers a wide range of<br />
                <span className='text-[#1ECB15]'>commercial cars</span> and <span className='text-[#1ECB15]'>luxury cars for</span><br />
                any occasion.
              </h2>
            </div>
            <div className="flex flex-col pr-[100px]">
              <p className="mt-[50px] font-inter text-[14px] font-normal leading-[27.2px] tracking-[-0.2px] text-left text-white">
                At our car rental agency, we believe that everyone deserves to experience the<br />
                pleasure of driving a reliable and comfortable vehicle, regardless of their budget.<br />
                We have curated a diverse fleet of well-maintained cars, ranging from sleek sedans<br />
                to spacious SUVs, all at competitive prices. With our streamlined rental process,<br />
                you can quickly and conveniently reserve your desired vehicle. Whether you need<br />
                transportation for a business trip, family vacation, or simply want to enjoy a<br />
                weekend getaway, we have flexible rental options to accommodate your schedule.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 w-full flex justify-around pb-[70px] px-[100px]">
            <div className="hover:scale-105 w-[301px] h-auto p-[30px_20px_20.59px_30px] gap-[9.4px] rounded-[10px] bg-[#FFFFFF26] shadow-[0px_30px_60px_0px_#0013570F] flex flex-col items-center">
              <span className="font-outfit text-[40px] font-semibold leading-[40px] tracking-[0.1px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1ECB15] to-[#179510]">
                <CountUp start={1} end={15425} duration={2.75} />
              </span>
              <span className="font-inter text-[16px] font-medium leading-[27.2px] tracking-[-0.2px] text-center text-[#FFFFFFBF]">
                Completed Orders
              </span>
            </div>
            <div className="hover:scale-105 w-[301px] h-auto p-[30px_20px_20.59px_30px] gap-[9.4px] rounded-[10px] bg-[#FFFFFF26] shadow-[0px_30px_60px_0px_#0013570F] flex flex-col items-center">
              <span className="font-outfit text-[40px] font-semibold leading-[40px] tracking-[0.1px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1ECB15] to-[#179510]">
                8745
              </span>
              <span className="font-inter text-[16px] font-medium leading-[27.2px] tracking-[-0.2px] text-center text-[#FFFFFFBF]">
                Happy Customers
              </span>
            </div>
            <div className="hover:scale-105 w-[301px] h-auto p-[30px_20px_20.59px_30px] gap-[9.4px] rounded-[10px] bg-[#FFFFFF26] shadow-[0px_30px_60px_0px_#0013570F] flex flex-col items-center">
              <span className="font-outfit text-[40px] font-semibold leading-[40px] tracking-[0.1px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1ECB15] to-[#179510]">
                235
              </span>
              <span className="font-inter text-[16px] font-medium leading-[27.2px] tracking-[-0.2px] text-center text-[#FFFFFFBF]">
                Vehicles Fleet
              </span>
            </div>
            <div className="hover:scale-105 w-[301px] h-auto p-[30px_20px_20.59px_30px] gap-[9.4px] rounded-[10px] bg-[#FFFFFF26] shadow-[0px_30px_60px_0px_#0013570F] flex flex-col items-center">
              <span className="font-outfit text-[40px] font-semibold leading-[40px] tracking-[0.1px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1ECB15] to-[#179510]">
                15
              </span>
              <span className="font-inter text-[16px] font-medium leading-[27.2px] tracking-[-0.2px] text-center text-[#FFFFFFBF]">
                Years Experience
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Nouvelle section avec une image de fond */}
      <div className="relative w-full h-[438px] mt-16 bg-[#F9FBFC] rounded-tl-lg">
        {/* Section Title */}
        <h2 className="absolute w-[349.71px] h-[40px] top-[14px] left-1/2 transform -translate-x-1/2 font-dm-sans text-[42px] font-bold leading-[40px] text-center text-gray-900">
          Why Choose Us?
        </h2>

        {/* Features */}
        <div className="absolute flex justify-around top-[150px] w-full px-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <img src="/images/Financing.png" alt="Special Financing Offers" className="w-[51px] h-[60px]" />
            <h3 className="w-[240.21px] h-[24px] font-dm-sans text-[20px] font-medium leading-[24px] text-left mt-6">Special Financing Offers</h3>
            <p className="w-[311.28px] h-[55.5px] font-dm-sans text-[15px] font-normal leading-[27.75px] text-left mt-6">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <img src="/images/Dealership.png" alt="Trusted Car Dealership" className="w-[60px] h-[60px]" />
            <h3 className="w-[228.21px] h-[24px] font-dm-sans text-[20px] font-medium leading-[24px] text-left mt-6">Trusted Car Dealership</h3>
            <p className="w-[311.28px] h-[55.5px] font-dm-sans text-[15px] font-normal leading-[27.75px] text-left mt-6">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <img src="/images/Pricing.png" alt="Transparent Pricing" className="w-[60px] h-[60px] mr-[25px]" />
            <h3 className="w-[228.21px] h-[24px] font-dm-sans text-[20px] font-medium leading-[24px] text-left mt-6">Transparent Pricing</h3>
            <p className="w-[311.28px] h-[55.5px] font-dm-sans text-[15px] font-normal leading-[27.75px] text-left mt-6">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <img src="/images/Service.png" alt="Expert Car Service" className="w-[60px] h-[60px] mr-[25px]" />
            <h3 className="w-[228.21px] h-[24px] font-dm-sans text-[20px] font-medium leading-[24px] text-left mt-6">Expert Car Service</h3>
            <p className="w-[311.28px] h-[55.5px] font-dm-sans text-[15px] font-normal leading-[27.75px] text-left mt-6">
              Our stress-free finance department that can find financial solutions to save you money.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
