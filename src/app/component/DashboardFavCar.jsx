import React from 'react';
import Link from 'next/link';
import { FaUser, FaCalendar, FaCar, FaSignOutAlt } from 'react-icons/fa';

const DashboardFavCar = ({ client, activePage, handleItemClick, handleLogout, handleDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 w-full md:w-1/5 flex flex-col items-center max-h-[600px]">
            <img src={client.image ? client.image : '/images/avatar.png'} alt="Profile" className="rounded-full w-32 h-32 border-4 border-[#1ECB15]" width={128} height={128} />
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
                    <li>
                        <button onClick={() => handleDelete(client._id)} className=" text-red-500 py-1 px-2 rounded-full ml-2">
                            Delete my Account
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DashboardFavCar;