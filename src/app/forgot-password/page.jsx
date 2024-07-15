"use client";
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Failed to send reset password email');
      }
      setMessage('A reset password email has been sent to your email address.');
    } catch (error) {
      setError('Failed to send reset password email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[409.33px] h-[268.75px] bg-white rounded-[4.8px] shadow-[0px_30px_60px_0px_#0013570F] p-10">
        <h2 className="text-[#020202] font-outfit font-semibold text-[20px] leading-[26px] tracking-[-0.2px]">Forgot Password</h2>
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[329.33px] h-[45.59px] mt-10 p-[12px_10px_13.59px_10px] rounded-[6px] bg-[#00000006] border-[2px] border-[#EEEEEE] text-[#757575] font-inter font-normal text-[16px] leading-[19.36px] placeholder-[#757575]"
          required
        />
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleForgotPassword} className="w-[329.33px] h-[45.19px] mt-[15px] p-[3.4px_0px_4.59px_0px] rounded-[4.8px] bg-[#1ECB15] text-white font-inter font-bold text-[16px] leading-[19.36px]">Send Reset Email</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
