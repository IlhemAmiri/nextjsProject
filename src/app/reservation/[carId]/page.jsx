"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const ReservationPage = () => {
  const userId = localStorage.getItem('userId');
  const { carId } = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');
  const [formData, setFormData] = useState({
    dateDebut: new Date(),
    dateFin: new Date(),
    chauffeur: false,
    commentaire: '',
    lieuRamassage: '',
    destination: '',
    idClient: userId,
    idVoiture: carId,
  });
  const [errors, setErrors] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/cars/${carId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCar(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la voiture :', error);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  useEffect(() => {
    if (car) {
      const dateDebut = new Date(formData.dateDebut);
      const dateFin = new Date(formData.dateFin);
      const period = (dateFin - dateDebut) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      const price = period * car.prixParJ;
      setTotalPrice(price);
    }
  }, [formData.dateDebut, formData.dateFin, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    const now = new Date();
    const dateDebut = new Date(formData.dateDebut);
    const dateFin = new Date(formData.dateFin);

    if (dateDebut >= dateFin) {
      newErrors.push('Start date must be before end date');
    }
    if (dateDebut <= now || dateFin <= now) {
      newErrors.push('Dates must be in the future');
    }

    if (newErrors.length === 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/reservations', {
          ...formData,
          dateDebut: formData.dateDebut.toISOString(),
          dateFin: formData.dateFin.toISOString(),
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        router.push('/orders');
      } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error.response.data.message);
        newErrors.push(error.response.data.message);
      }
    }
    setErrors(newErrors);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  return (
    <div>
      <div className="h-[400px] bg-cover bg-center bg-[url('/images/road.jpg')]">
        <div className=" text-white flex justify-between items-center px-6 lg:px-12 py-4">
          <div className="flex justify-center">
            <a href="#">
              <img src="/images/Container.png" alt="Logo" className='w-40 h-14' />
            </a>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex space-x-4 lg:space-x-20">
              <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
              <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Booking</a>
              <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
              <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blog</a>
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
          <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 pr-6">
            <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Home</a>
            <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Cars</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a>
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blog</a>
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
      <div className="container mx-auto px-4 py-8 flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Booking a Car</h1>
          {car && (
            <div className="mb-8 flex items-center">
              <img src={car.image} alt={`${car.marque} ${car.modele}`} className="w-24 h-20 mr-6 rounded-lg shadow-md" />
              <div>
                <h2 className="text-2xl font-semibold">{`${car.marque} ${car.modele}`}</h2>
                <p className="text-gray-700">Price per day: ${car.prixParJ}</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pick-up Date</label>
                <DatePicker
                  selected={formData.dateDebut}
                  onChange={(date) => handleDateChange('dateDebut', date)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Drop-off Date</label>
                <DatePicker
                  selected={formData.dateFin}
                  onChange={(date) => handleDateChange('dateFin', date)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pick-up Location</label>
                <input
                  type="text"
                  name="lieuRamassage"
                  value={formData.lieuRamassage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Comments</label>
              <textarea
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <input
                  type="checkbox"
                  name="chauffeur"
                  checked={formData.chauffeur}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                Need a driver
              </label>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">Total Price: ${totalPrice}</p>
            </div>
            <div className="mb-4">
              {errors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error:</strong>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#1ECB15] text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;