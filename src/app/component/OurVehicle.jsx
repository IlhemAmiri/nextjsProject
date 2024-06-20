import React from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

const OurVehicle = ({ cars }) => {
  return (
    <div className="bg-gray-100">
      <div className="pt-16 px-[12%]">
        <div className="text-center mb-12">
          <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px] mb-4">
            Our Vehicle Fleet
          </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md mb-20 transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.modele}
                  className="rounded-t-lg w-full h-[218.33px] object-cover"
                />
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
                <h3 className="font-dm-sans text-[18px] font-bold leading-[21.6px]">
                  {car.marque} {car.modele}
                </h3>
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
                  <Link href={`/detailsCar/${car._id}`}>
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
    </div>
  );
};

export default OurVehicle;
