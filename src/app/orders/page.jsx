"use client";

import React, { useState } from 'react';
import axios from 'axios';

const ReservationPage = () => {
  const userId = localStorage.getItem('userId'); // Récupère l'ID utilisateur depuis localStorage

  const [formData, setFormData] = useState({
    dateDebut: '',
    dateFin: '',
    chauffeur: false,
    commentaire: '',
    lieuRamassage: '',
    destination: '',
    idClient: userId, // Utilise l'ID utilisateur comme idClient dans la formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/reservations', formData);
      console.log(response.data); // Gérer le succès, par exemple afficher un message de confirmation
    } catch (error) {
      console.error('Erreur lors de la création de la réservation :', error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Faire une réservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lieuRamassage" className="block text-sm font-medium text-gray-700">
            Lieu de ramassage
          </label>
          <input
            type="text"
            id="lieuRamassage"
            name="lieuRamassage"
            value={formData.lieuRamassage}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="date"
            id="dateDebut"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            type="date"
            id="dateFin"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chauffeur" className="block text-sm font-medium text-gray-700">
            Chauffeur requis
          </label>
          <input
            type="checkbox"
            id="chauffeur"
            name="chauffeur"
            checked={formData.chauffeur}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, chauffeur: e.target.checked }))}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700">
            Commentaire
          </label>
          <textarea
            id="commentaire"
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Réserver
        </button>
      </form>
    </div>
  );
};

export default ReservationPage;
