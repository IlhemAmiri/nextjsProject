"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import NavProfile from '../../component/NavProfile'
import ReservationForm from '../../component/ReservationForm'

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
      <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ReservationForm
        car={car}
        formData={formData}
        handleDateChange={handleDateChange}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default ReservationPage;