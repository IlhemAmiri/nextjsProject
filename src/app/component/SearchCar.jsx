"use client";

import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Link from 'next/link';

const SearchCar = ({ cars, marque }) => {
    return (
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
    );
};

export default SearchCar;