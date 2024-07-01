"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    email: string;
    role: string;
    image?: string;
    deleted_at?: Date | null;
    nom?: string;
    prenom?: string;
    CIN?: string;
    passport?: string;
    adresse?: string;
    numTel?: string;
    dateNaissance?: Date;
    numPermisConduire?: string;
    dateExpirationPermis?: Date;
}

const AllUsersPage = () => {
    const [admins, setAdmins] = useState<User[]>([]);
    const [activeClients, setActiveClients] = useState<User[]>([]);
    const [deletedClients, setDeletedClients] = useState<User[]>([]);
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
        } else {
            const authStatus = localStorage.getItem('isAuth') === 'true';
            setIsAuth(authStatus);
            fetchUsers();
        }
    }, [router]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users: User[] = await response.json();
            const adminUsers = users.filter(user => user.role === 'admin');
            const activeClientUsers = users.filter(user => user.role === 'client' && !user.deleted_at);
            const deletedClientUsers = users.filter(user => user.role === 'client' && user.deleted_at);

            setAdmins(adminUsers);
            setActiveClients(activeClientUsers);
            setDeletedClients(deletedClientUsers);
        } catch (error) {
            console.error(error);
        }
    };

    if (!isMounted || !isAdmin) {
        return null;
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };


    const handleDelete = async (clientId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/users/clients/${clientId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete client');
            }

            alert(`Le client avec l'identifiant ${clientId} a été supprimé`);

            // Fetch the updated list of users
            fetchUsers();
            // Optionally, update the state to remove the deleted client from the list
            //setActiveClients(prevClients => prevClients.filter(client => client._id !== clientId));
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the client');
        }
    };

    return (
        <div>
            <div className="h-[150px] bg-cover bg-center bg-[url('/images/road.jpg')]">
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
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-2xl font-semibold mb-8 text-center">Admin</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Role</th>
                                <th className="text-left py-2 px-4">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.email} className="border-b">
                                    <td className="py-2 px-4">{admin.email}</td>
                                    <td className="py-2 px-4">{admin.role}</td>
                                    <td className="py-2 px-4">
                                        {admin.image ? <img src={admin.image} alt="Admin" className="w-8 h-8 rounded-full" /> : 'No Image'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="text-2xl font-semibold my-8 text-center">Active Clients</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Name</th>
                                <th className="text-left py-2 px-4">CIN</th>
                                <th className="text-left py-2 px-4">Passport</th>
                                <th className="text-left py-2 px-4">Address</th>
                                <th className="text-left py-2 px-4">Phone</th>
                                <th className="text-left py-2 px-4">Birth Date</th>
                                <th className="text-left py-2 px-4">License Number</th>
                                <th className="text-left py-2 px-4">License Expiry</th>
                                <th className="text-left py-2 px-4">Image</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeClients.map(client => (
                                <tr key={client.email} className="border-b">
                                    <td className="py-2 px-4"><Link href={`/user/${client._id}`}>{client.email}</Link></td>
                                    <td className="py-2 px-4">{`${client.nom} ${client.prenom}`}</td>
                                    <td className="py-2 px-4">{client.CIN}</td>
                                    <td className="py-2 px-4">{client.passport}</td>
                                    <td className="py-2 px-4">{client.adresse}</td>
                                    <td className="py-2 px-4">{client.numTel}</td>
                                    <td className="py-2 px-4">{new Date(client.dateNaissance!).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{client.numPermisConduire}</td>
                                    <td className="py-2 px-4">{new Date(client.dateExpirationPermis!).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
                                        {client.image ? <img src={client.image} alt="Client" className="w-8 h-8 rounded-full" /> : 'No Image'}
                                    </td>
                                    <td className="py-2 px-4">
                                        <Link href={`/updateUser/${client._id}`}>
                                            <button className="bg-blue-500 text-white py-1 px-2 rounded-full hover:bg-blue-600">
                                                Update
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(client._id)} className="bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-600 ml-2">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="text-2xl font-semibold my-8 text-center">Deleted Clients</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded mb-8">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Name</th>
                                <th className="text-left py-2 px-4">CIN</th>
                                <th className="text-left py-2 px-4">Passport</th>
                                <th className="text-left py-2 px-4">Address</th>
                                <th className="text-left py-2 px-4">Phone</th>
                                <th className="text-left py-2 px-4">Birth Date</th>
                                <th className="text-left py-2 px-4">License Number</th>
                                <th className="text-left py-2 px-4">License Expiry</th>
                                <th className="text-left py-2 px-4">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deletedClients.map(client => (
                                <tr key={client.email} className="border-b">
                                    <td className="py-2 px-4">{client.email}</td>
                                    <td className="py-2 px-4">{`${client.nom} ${client.prenom}`}</td>
                                    <td className="py-2 px-4">{client.CIN}</td>
                                    <td className="py-2 px-4">{client.passport}</td>
                                    <td className="py-2 px-4">{client.adresse}</td>
                                    <td className="py-2 px-4">{client.numTel}</td>
                                    <td className="py-2 px-4">{new Date(client.dateNaissance!).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">{client.numPermisConduire}</td>
                                    <td className="py-2 px-4">{new Date(client.dateExpirationPermis!).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
                                        {client.image ? <img src={client.image} alt="Client" className="w-8 h-8 rounded-full" /> : 'No Image'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsersPage;