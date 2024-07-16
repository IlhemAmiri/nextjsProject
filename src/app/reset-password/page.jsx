"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        const emailParam = searchParams.get('email');

        if (!tokenParam || !emailParam) {
            setError('Invalid or missing token/email');
        } else {
            setToken(tokenParam);
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:3001/users/reset-password', {
                resetToken: token,
                newPassword,
                email,
            });
            setMessage('Password has been reset successfully');
            setError('');
            router.push('/signin');
        } catch (err) {
            setError(err.response.data.message || 'Failed to reset password');
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center py-12 bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                {message && <div className="text-green-500 mb-4">{message}</div>}
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block font-medium mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="w-full border rounded px-3 py-2"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full border rounded px-3 py-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded transition-transform hover:scale-105"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;