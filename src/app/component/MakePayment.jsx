"use client";

import React from 'react';
import { FaCreditCard } from 'react-icons/fa';

const MakePayment = ({ reservation, paymentMethod, setPaymentMethod, handlePayment, error }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Make a Payment</h2>
                {reservation ? (
                    <div>
                        <p className="text-lg font-medium text-gray-700">Total Price: {reservation.tarifTotale} €</p>
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div>
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                                    Payment Method
                                </label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1ECB15] focus:border-[#1ECB15] sm:text-sm"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="card">Card</option>
                                </select>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ECB15] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                            >
                                <FaCreditCard className="mr-2" /> Pay
                            </button>
                        </form>
                    </div>
                ) : (
                    <p>Loading reservation details...</p>
                )}
            </div>
        </div>
    );
  };

export default MakePayment;