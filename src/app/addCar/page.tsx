"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AddCarPage = () => {
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [anneeFabrication, setAnneeFabrication] = useState<number>(2020);
    const [typeCarburant, setTypeCarburant] = useState('essence');
    const [typeTransmission, setTypeTransmission] = useState('manuelle');
    const [categorie, setCategorie] = useState('compacte');
    const [disponibilite, setDisponibilite] = useState('disponible');
    const [kilometrage, setKilometrage] = useState<number>(0);
    const [NbPlaces, setNbPlaces] = useState<number>(4);
    const [NbPortes, setNbPortes] = useState<number>(4);
    const [climatisation, setClimatisation] = useState<boolean>(false);
    const [caracteristiques, setCaracteristiques] = useState('');
    const [accessoiresOptionSupp, setAccessoiresOptionSupp] = useState('');
    const [prixParJ, setPrixParJ] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [image3, setImage3] = useState<File | null>(null);
    const [image4, setImage4] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin');
        if (role !== 'admin') {
            router.push('/');
        }
    }, [router]);

    const handleAddCar = async () => {
        if (!isMounted) return;

        const formData = new FormData();
        formData.append('marque', marque);
        formData.append('modele', modele);
        formData.append('anneeFabrication', anneeFabrication.toString());
        formData.append('typeCarburant', typeCarburant);
        formData.append('typeTransmission', typeTransmission);
        formData.append('categorie', categorie);
        formData.append('disponibilite', disponibilite);
        formData.append('kilometrage', kilometrage.toString());
        formData.append('NbPlaces', NbPlaces.toString());
        formData.append('NbPortes', NbPortes.toString());
        formData.append('climatisation', climatisation.toString());
        formData.append('caracteristiques', caracteristiques);
        formData.append('accessoiresOptionSupp', accessoiresOptionSupp);
        formData.append('prixParJ', prixParJ.toString());
        if (image) formData.append('images', image);
        if (image2) formData.append('images', image2);
        if (image3) formData.append('images', image3);
        if (image4) formData.append('images', image4);

        try {
            const response = await fetch('http://localhost:3001/cars', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to add car');
            }
            router.push('/cars');
        } catch (error) {
            setError('Failed to add car');
        }
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
    };

    if (!isMounted || !isAdmin) {
        return null;
    }
    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    return (
        <div>
            <div className="h-[300px] bg-cover bg-center bg-[url('/images/road.jpg')]">
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
            <div className="flex flex-col items-center justify-center flex-1 my-16">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-10">
                    <h2 className="text-gray-800 font-semibold text-2xl mb-6">Add Car</h2>
                    <form className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="brand">Brand</label>
                            <input
                                id="brand"
                                type="text"
                                placeholder="Brand"
                                value={marque}
                                onChange={(e) => setMarque(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="model">Model</label>
                            <input
                                id="model"
                                type="text"
                                placeholder="Model"
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="year">Year of Manufacture</label>
                            <input
                                id="year"
                                type="number"
                                placeholder="Year of Manufacture"
                                value={anneeFabrication}
                                onChange={(e) => setAnneeFabrication(parseInt(e.target.value))}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="fuel">Fuel Type</label>
                            <select
                                id="fuel"
                                value={typeCarburant}
                                onChange={(e) => setTypeCarburant(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800"
                            >
                                <option value="essence">Gasoline</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybride">Hybrid</option>
                                <option value="electrique">Electric</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="transmission">Transmission Type</label>
                            <select
                                id="transmission"
                                value={typeTransmission}
                                onChange={(e) => setTypeTransmission(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800"
                            >
                                <option value="manuelle">Manual</option>
                                <option value="automatique">Automatic</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800"
                            >
                                <option value="compacte">Compact</option>
                                <option value="berline">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="monospace">Minivan</option>
                                <option value="cabriolet">Convertible</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="availability">Availability</label>
                            <select
                                id="availability"
                                value={disponibilite}
                                onChange={(e) => setDisponibilite(e.target.value)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800"
                            >
                                <option value="disponible">Available</option>
                                <option value="reserver">Reserved</option>
                                <option value="en entretien">In Maintenance</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="mileage">Mileage</label>
                            <input
                                id="mileage"
                                type="number"
                                placeholder="Mileage"
                                value={kilometrage}
                                onChange={(e) => setKilometrage(parseInt(e.target.value))}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="seats">Number of Seats</label>
                            <input
                                id="seats"
                                type="number"
                                placeholder="Number of Seats"
                                value={NbPlaces}
                                onChange={(e) => setNbPlaces(parseInt(e.target.value))}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="doors">Number of Doors</label>
                            <input
                                id="doors"
                                type="number"
                                placeholder="Number of Doors"
                                value={NbPortes}
                                onChange={(e) => setNbPortes(parseInt(e.target.value))}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-gray-700 font-medium mb-2 mr-2" htmlFor="air-conditioning">Air Conditioning</label>
                            <input
                                id="air-conditioning"
                                type="checkbox"
                                checked={climatisation}
                                onChange={(e) => setClimatisation(e.target.checked)}
                                className="h-6 w-6 rounded bg-gray-50 border border-gray-300"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="features">Features</label>
                            <textarea
                                id="features"
                                placeholder="Features"
                                value={caracteristiques}
                                onChange={(e) => setCaracteristiques(e.target.value)}
                                className="w-full h-24 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            ></textarea>
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="optional-accessories">Optional Accessories</label>
                            <textarea
                                id="optional-accessories"
                                placeholder="Optional Accessories"
                                value={accessoiresOptionSupp}
                                onChange={(e) => setAccessoiresOptionSupp(e.target.value)}
                                className="w-full h-24 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="price">Price per Day</label>
                            <input
                                id="price"
                                type="number"
                                placeholder="Price per Day"
                                value={prixParJ}
                                onChange={(e) => setPrixParJ(parseFloat(e.target.value))}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="image">Upload Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="image2">Upload Additional Image</label>
                            <input
                                id="image2"
                                type="file"
                                onChange={(e) => setImage2(e.target.files?.[0] || null)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="image3">Upload Additional Image</label>
                            <input
                                id="image3"
                                type="file"
                                onChange={(e) => setImage3(e.target.files?.[0] || null)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label className="text-gray-700 font-medium mb-2" htmlFor="image4">Upload Additional Image</label>
                            <input
                                id="image4"
                                type="file"
                                onChange={(e) => setImage4(e.target.files?.[0] || null)}
                                className="w-full h-12 px-4 rounded border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {error && <p className="text-red-500 col-span-2">{error}</p>}
                        <button
                            onClick={handleAddCar}
                            className="w-full col-span-2 h-12 mt-6 rounded bg-[#1ECB15]  text-white font-bold text-lg"
                        >
                            Add Car
                        </button>
                    </form>
                </div>
            </div>

        </div>

    );
}

export default AddCarPage;
