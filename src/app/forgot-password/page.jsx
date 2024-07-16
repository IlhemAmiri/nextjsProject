"use client";
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/users/forgot-password', { email });
            setMessage('Password reset email sent. Please check your inbox.');
            setError('');
        } catch (err) {
            setError(err.response.data.message || 'Failed to send password reset email');
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center py-12 bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                {message && <div className="text-green-500 mb-4">{message}</div>}
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border rounded px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded transition-transform hover:scale-105"
                    >
                        Send Reset Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;


