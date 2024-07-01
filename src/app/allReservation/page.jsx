"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import NavProfile from '../component/NavProfile'


const AllReservationPage = () => {
    const [reservations, setReservations] = useState([]);
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
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);

        if (role === 'admin') {
            fetchReservations();
        } else {
            router.push('/');
        }
    }, [router]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/reservations', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setReservations(response.data);
        } catch (error) {
            setError('Failed to fetch reservations');
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:3001/reservations/${id}/status`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchReservations(); // Refresh reservations
        } catch (error) {
            setError('Failed to update status');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    if (!isMounted || !isAdmin) {
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    const renderTable = (status) => {
        const filteredReservations = reservations.filter(res => res.status === status);
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pick Up Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop Off Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pick Up Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">With Driver</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    <img src={reservation.idClient.image} alt="Profile" className="rounded-full w-8 h-8 mr-4" />
                                    <Link href={`/user/${reservation.idClient._id}`}>
                                    {reservation.idClient.nom} {reservation.idClient.prenom}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap"><Link href={`/detailsCar/${reservation.idVoiture._id}`}>{reservation.idVoiture.marque} {reservation.idVoiture.modele}</Link></td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.lieuRamassage}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.destination}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.dateDebut)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.dateFin)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.tarifTotale} $</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.chauffeur ? 'Yes' : 'No'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => updateStatus(reservation._id, 'confirmer')} className="mr-2 bg-[#00B74A] text-white rounded-full text-[14px] px-2 py-1">Confirm</button>
                                    <button onClick={() => updateStatus(reservation._id, 'annuler')} className="mr-2 bg-[#F93154] text-white rounded-full text-[14px] px-2 py-1">Cancel</button>
                                    <button onClick={() => updateStatus(reservation._id, 'en Attent')} className="bg-[#FFA900] text-white rounded-full text-[14px] px-2 py-1">Schedule</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Scheduled Reservations</h2>
                {renderTable('en Attent')}
                <h2 className="text-xl font-semibold mb-4 mt-8">Confirmed Reservations</h2>
                {renderTable('confirmer')}
                <h2 className="text-xl font-semibold mb-4 mt-8">Cancelled Reservations</h2>
                {renderTable('annuler')}
            </div>
        </div>
    );
}

export default AllReservationPage;
