import React from 'react';
import Link from 'next/link';

const FormProfile = ({ client }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <div className="flex mb-4">
                <div className="text-center cursor-pointer border-b-2 border-[#1ECB15] text-[#1ECB15] font-semibold px-4">Profile</div>
                <div className="text-center cursor-pointer border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 px-4">Notifications</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Email Address</label>
                        <input type="email" value={client.email} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">CIN</label>
                        <input type="text" value={client.CIN} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Passport</label>
                        <input type="text" value={client.passport} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input type="text" value={client.adresse} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone Number</label>
                        <input type="text" value={client.numTel} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input type="date" value={new Date(client.dateNaissance).toISOString().substring(0, 10)} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Driver's License Number</label>
                        <input type="text" value={client.numPermisConduire} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Driver's License Expiry Date</label>
                        <input type="date" value={new Date(client.dateExpirationPermis).toISOString().substring(0, 10)} className="mt-1 p-2 w-full border rounded-md" readOnly />
                    </div>
                </div>
                <div className="mt-6">
                    <Link href={`/updateUser/${client._id}`}>
                        <button className="bg-[#1ECB15] text-white font-bold py-2 px-6 rounded hover:bg-[#17ab12] transition">Update Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormProfile;