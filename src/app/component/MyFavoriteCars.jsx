import React from 'react';
import Link from 'next/link';
import { FaArrowUp } from 'react-icons/fa';

const MyFavoriteCars = ({ cars }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-4">My Favorite Cars</h1>
            {cars.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {cars.map((car) => (
                        <div key={car._id} className="flex flex-col md:flex-row bg-white shadow-md rounded-md overflow-hidden">
                            <img src={car.image} alt={car.modele} className="w-full md:w-1/3 h-48 object-cover" />
                            <div className="p-4 md:w-2/3 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{car.marque} {car.modele}</h2>
                                    <p className="text-gray-700">Category: {car.categorie}</p>
                                    <p className="text-gray-700">Mileage: {car.kilometrage} km</p>
                                    <p className="text-gray-700">Fuel: {car.typeCarburant}</p>
                                    <p className="text-gray-700">Transmission: {car.typeTransmission}</p>
                                    <p className="text-gray-700">Year: {car.anneeFabrication}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-gray-700 font-bold text-lg">{car.prixParJ} $/Day</p>
                                    <Link href={`/detailsCar/${car._id}`}>
                                        <div className="text-[#1ECB15] text-sm flex items-center text-[15px] cursor-pointer">
                                        View Details  <FaArrowUp className="ml-1 rotate-45" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">You don't have any favorite cars at the moment.</p>
            )}
        </div>
    );
};

export default MyFavoriteCars;
