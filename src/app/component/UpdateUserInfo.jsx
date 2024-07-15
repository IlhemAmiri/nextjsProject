"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const UpdateUserInfo = ({ client, setClient, handleFileChange, handleUpdate, error, activePage, handleItemClick, handleLogout }) => {
    const [formError, setFormError] = useState('');

    const handlePhoneChange = (value) => {
        // Add the "+" sign if necessary and check the length
        const formattedValue = value.startsWith('+') ? value : `+${value}`;
        if (formattedValue.length >= 6) {
            setClient({ ...client, numTel: formattedValue });
            setFormError(''); // Clear the error message if valid
        } else {
            setFormError('Phone number must be at least 6 characters long.');
        }
    };
    

    const validateForm = () => {
        if (!client.nom || !client.prenom || !client.email || !client.numTel || !client.adresse || !client.CIN || !client.passport || !client.dateNaissance || !client.numPermisConduire || !client.dateExpirationPermis) {
            setFormError('Please fill out all required fields.');
            return false;
        }
        setFormError('');
        return true;
    };

    const handleUpdateClick = () => {
        if (validateForm()) {
            handleUpdate();
        }
    };

    return (
        <div className="flex justify-center py-12 bg-gray-100">
            <div className="w-full max-w-7xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 pl-[2.5%]">
                <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/4 flex flex-col items-center">
                    <img src={client.image ? client.image : '/images/avatar.png'} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" />
                    <h2 className="text-xl font-semibold mt-4 text-center">{client.nom} {client.prenom}</h2>
                    <p>{client.email}</p>
                    <nav className="mt-6 w-full">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/profile">
                                    <div
                                        onClick={() => handleItemClick('profile')}
                                        className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'profile' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                                            }`}
                                    >
                                        <FaUser className={`inline-block mr-2 ${activePage === 'profile' ? 'text-white' : 'text-[#1ECB15]'}`} />My Profile
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders">
                                    <div
                                        onClick={() => handleItemClick('orders')}
                                        className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'orders' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                                            }`}
                                    >
                                        <FaCalendar className={`inline-block mr-2 ${activePage === 'orders' ? 'text-white' : 'text-[#1ECB15]'}`} />My Orders
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile">
                                    <div
                                        onClick={() => handleItemClick('favorites')}
                                        className={`cursor-pointer py-2 px-6 rounded transition ${activePage === 'favorites' ? 'bg-[#1ECB15] text-white hover:bg-[#17ab12]' : 'bg-white text-black'
                                            }`}
                                    >
                                        <FaCar className={`inline-block mr-2 ${activePage === 'favorites' ? 'text-white' : 'text-[#1ECB15]'}`} />My Favorite Cars
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div
                                    onClick={handleLogout}
                                    className="cursor-pointer py-2 px-6 rounded transition bg-white text-black"
                                >
                                    <FaSignOutAlt className="inline-block mr-2 text-[#1ECB15]" />Logout
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="bg-white shadow-md rounded-md p-6 w-full md:w-3/4">
                    <h2 className="text-2xl font-semibold mb-4">Update Client Information</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {formError && <div className="text-red-500 mb-4">{formError}</div>}
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="nom" className="block font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="nom"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.nom}
                                    onChange={(e) => setClient({ ...client, nom: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="prenom" className="block font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    id="prenom"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.prenom}
                                    onChange={(e) => setClient({ ...client, prenom: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.email}
                                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <div className="mt-1 flex items-center">
                                    <PhoneInput
                                        country={'tn'} // Définissez ici le pays par défaut souhaité
                                        value={client.numTel}
                                        onChange={handlePhoneChange}
                                        inputProps={{
                                            name: 'numTel',
                                            required: true,
                                            className: 'block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                                        }}
                                        containerStyle={{
                                            display: 'flex',
                                            flexDirection: 'row-reverse',
                                            alignItems: 'center',
                                            width: '100%',
                                            position: 'relative', // Ajouté pour gérer le positionnement absolu de la liste déroulante
                                        }}
                                        buttonStyle={{
                                            order: 2,
                                            marginLeft: '10px',
                                        }}
                                        inputStyle={{
                                            flex: '1',
                                        }}
                                        dropdownStyle={{
                                            position: 'absolute', // Assure que la liste déroulante est positionnée relativement au conteneur
                                            right: 0, // Aligne la liste déroulante à droite
                                            zIndex: 50, // Assure que la liste déroulante est au-dessus des autres éléments
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="adresse" className="block font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    id="adresse"
                                    className="w-full border rounded px-3 py-2"
                                    value={client.adresse}
                                    onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="CIN" className="block font-medium mb-2">CIN</label>
                                <input
                                    type="text"
                                    id="CIN"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.CIN}
                                    onChange={(e) => setClient({ ...client, CIN: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="passport" className="block font-medium mb-2">Passport</label>
                                <input
                                    type="text"
                                    id="passport"
                                    className="w-full border rounded px-3 py-2"
                                    value={client.passport}
                                    onChange={(e) => setClient({ ...client, passport: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="dateNaissance" className="block font-medium mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateNaissance"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.dateNaissance}
                                    onChange={(e) => setClient({ ...client, dateNaissance: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="numPermisConduire" className="block font-medium mb-2">Driver's License Number</label>
                                <input
                                    type="text"
                                    id="numPermisConduire"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.numPermisConduire}
                                    onChange={(e) => setClient({ ...client, numPermisConduire: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateExpirationPermis" className="block font-medium mb-2">Driver's License Expiry Date</label>
                                <input
                                    type="date"
                                    id="dateExpirationPermis"
                                    required
                                    className="w-full border rounded px-3 py-2"
                                    value={client.dateExpirationPermis}
                                    onChange={(e) => setClient({ ...client, dateExpirationPermis: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block font-medium mb-2">Profile Picture</label>
                                <input
                                    type="file"
                                    id="image"
                                    className="w-full border rounded px-3 py-2"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleUpdateClick}
                            className="mt-6 w-full bg-[#1ECB15] text-white py-2 px-4 rounded transition-transform hover:scale-105"
                        >
                            Update Information
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserInfo;
