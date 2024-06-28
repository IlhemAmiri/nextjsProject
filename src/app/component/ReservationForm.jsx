import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = ({ car, formData, handleDateChange, handleChange, handleSubmit, errors, totalPrice }) => {
    return (
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
    );
};

export default ReservationForm;