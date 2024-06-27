"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { FaArrowUp } from 'react-icons/fa';
import NavProfile from '../component/NavProfile'


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

const FavCarPage = () => {
  const [activePage, setActivePage] = useState('favorites');
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchClientData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/signin');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const [clientResponse, favoriteCarsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/users/clients/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(`http://localhost:3001/favorite-cars/client/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        setClient(clientResponse.data);
        const favoriteCars = favoriteCarsResponse.data;
        setTotalItems(favoriteCars.length);

        // Fetch car details for each favorite car
        const carDetailsPromises = favoriteCars.map((favCar: any) =>
          axios.get(`http://localhost:3001/cars/${favCar.idVoiture}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        );
        const carDetailsResponses = await Promise.all(carDetailsPromises);
        const carDetails = carDetailsResponses.map(response => response.data);
        setCars(carDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch client or data');
      }
    };

    fetchClientData();
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [router]);

  const handleItemClick = (page: string) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  if (!client) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-6">
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/5 flex flex-col items-center max-h-[600px]">
            <img src={client.image} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" width={128} height={128} />
            <h2 className="text-xl font-semibold mt-4 text-center">{client.nom} {client.prenom}</h2>
            <p>{client.email}</p>
            <nav className="mt-6 w-full">
              <ul className="space-y-2">
                <li>
                  <Link href="/profile">
                    <div
                      onClick={() => handleItemClick('profile')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'profile' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'}`}
                    >
                      <FaUser className={`inline-block mr-2 ${activePage === 'profile' ? 'text-white' : 'text-[#1ECB15]'}`} />My Profile
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/orders">
                    <div
                      onClick={() => handleItemClick('orders')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'orders' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'}`}
                    >
                      <FaCalendar className={`inline-block mr-2 ${activePage === 'orders' ? 'text-white' : 'text-[#1ECB15]'}`} />My Orders
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/favCar">
                    <div
                      onClick={() => handleItemClick('favorites')}
                      className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'favorites' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'}`}
                    >
                      <FaCar className={`inline-block mr-2 ${activePage === 'favorites' ? 'text-white' : 'text-[#1ECB15]'}`} /> My Favorite Cars
                    </div>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-white text-black cursor-pointer py-2 px-6">
                    <FaSignOutAlt className="inline-block mr-2 text-[#1ECB15]" /> Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-4">My Favorite Cars</h1>
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div key={car._id} className="bg-white shadow-md rounded-md p-4">
                    <img src={car.image} alt={car.modele} className="w-full h-48 object-cover rounded-md mb-4" />
                    <h2 className="text-lg font-semibold">{car.marque} {car.modele}</h2>
                    <p className="text-gray-700">{car.categorie}</p>
                    <p className="text-gray-700">Kilometrage: {car.kilometrage} km</p>
                    <p className="text-gray-700">Carburant: {car.typeCarburant}</p>
                    <p className="text-gray-700">Transmission: {car.typeTransmission}</p>
                    <p className="text-gray-700">Année: {car.anneeFabrication}</p>
                    <p className="text-gray-700 font-bold">{car.prixParJ} $/jour</p>
                    <Link href={`/detailsCar/${car._id}`}>
                      <div className="text-[#1ECB15] text-sm flex items-center text-[15px] cursor-pointer">
                        View Details <FaArrowUp className="ml-1 rotate-45" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">Vous n'avez pas de voitures favorites pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavCarPage;
