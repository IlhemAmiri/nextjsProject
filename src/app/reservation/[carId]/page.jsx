"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="relative h-[380px] w-full">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/road.jpg')]">
          <div className="absolute inset-0">
            <div className="text-white flex justify-between items-center px-[12%] h-[102px]">
              <div className="flex justify-center">
                <a href="#">
                  <img src="/images/Container.png" alt="Logo" className="w-[156px] h-[56px]" />
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <nav className="flex space-x-16">
                  <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</a>
                  <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</a>
                  <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</a>
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Booking a Car</h1>
          {car && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img src={car.image} alt={`${car.marque} ${car.modele}`} className="w-16 h-16 mr-4" />
                <span className="text-xl font-semibold">{`${car.marque} ${car.modele} - $${car.prixParJ}`}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="mb-4 text-red-500">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="lieuRamassage" className="block text-sm font-medium text-gray-700">
                Pick Up Location
              </label>
              <input
                type="text"
                id="lieuRamassage"
                name="lieuRamassage"
                value={formData.lieuRamassage}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your pickup location"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your destination"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                Pick Up Date & Time
              </label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={formData.dateDebut}
                  onChange={(date) => handleDateChange('dateDebut', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                Return Date & Time
              </label>
              <div className="flex space-x-2">
                <DatePicker
                  selected={formData.dateFin}
                  onChange={(date) => handleDateChange('dateFin', date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="chauffeur" className="block text-sm font-medium text-gray-700">
                Chauffeur Required
              </label>
              <input
                type="checkbox"
                id="chauffeur"
                name="chauffeur"
                checked={formData.chauffeur}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="commentaire"
                name="commentaire"
                value={formData.commentaire}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                rows={4}
                placeholder="Need a baby seat"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Total Price: ${totalPrice.toFixed(2)}
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#1ECB15] text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
