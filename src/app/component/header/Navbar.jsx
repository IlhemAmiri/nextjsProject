import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaInstagram, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Navbar = () => {
  const getCurrentDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const now = new Date();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${monthName} ${day}, ${year} ${hours}:${minutes}`;
  };
  return (
    <div>
      <div className="bg-[#121212] text-white flex justify-between items-center px-6 py-2" style={{ paddingLeft: '12%', paddingRight: '12%' }}>
        <div className="flex items-center text-sm">
          <div className="flex items-center mr-4">
          <FaPhone className="text-[#1ECB15] mr-1 transform rotate-90" /> {/* Phone icon with green color */}
            <a href="tel:+2083339296" className="font-inter text-[14px] leading-[27.2px]">+208 333 9296</a>
          </div>
          <div className="flex items-center mr-4">
            <FaEnvelope className="text-[#1ECB15] mr-1" /> {/* Envelope icon with green color */}
            <a href="mailto:contact@rentaly.com" className="font-inter text-[14px] leading-[27.2px]">contact@rentaly.com</a>
          </div>
          <div className="flex items-center">
            <FaClock className="text-[#1ECB15] mr-1" /> {/* Clock icon with green color */}
            <span className="font-inter text-[14px] leading-[27.2px]">{getCurrentDate()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Social media icons */}
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaPinterest /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
