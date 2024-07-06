import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaInstagram, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Navbar = () => {
  // const getCurrentDate = () => {
  //   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //   const now = new Date();
  //   const dayName = days[now.getDay()];
  //   const monthName = months[now.getMonth()];
  //   const day = now.getDate();
  //   const year = now.getFullYear();
  //   const hours = now.getHours().toString().padStart(2, '0');
  //   const minutes = now.getMinutes().toString().padStart(2, '0');

  //   return `${dayName}, ${monthName} ${day}, ${year} ${hours}:${minutes}`;
  // };

  return (
    <div>
      <div className="bg-[#121212] text-white flex flex-col md:flex-row justify-between items-center px-24 py-2">
        <div className="flex flex-col md:flex-row items-center text-sm mb-2 md:mb-0">
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <FaPhone className="text-[#1ECB15] mr-1 transform rotate-90" />
            <a href="tel:+2083339296" className="font-inter text-[14px] leading-[27.2px]">+208 333 9296</a>
          </div>
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <FaEnvelope className="text-[#1ECB15] mr-1" />
            <a href="mailto:contact@rentaly.com" className="font-inter text-[14px] leading-[27.2px]">contact@rentaly.com</a>
          </div>
          <div className="flex items-center">
            <FaClock className="text-[#1ECB15] mr-1" />
            <span className="font-inter text-[14px] leading-[27.2px]">Mon - Fri 08.00 - 18.00</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
          <a href="#" aria-label="Pinterest"><FaPinterest /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
