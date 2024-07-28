"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaInstagram, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Navbar = () => {
  const [socialMedia, setSocialMedia] = useState(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await axios.get('http://localhost:3001/socialmedia');
        setSocialMedia(response.data);
      } catch (error) {
        console.error('Error fetching social media data', error);
      }
    };

    fetchSocialMedia();
  }, []);

  if (!socialMedia) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/images/loading.gif" alt="Loading..." className="w-[250px]" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#121212] text-white flex flex-col md:flex-row justify-between items-center px-24 py-2">
        <div className="flex flex-col md:flex-row items-center text-sm mb-2 md:mb-0">
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <FaPhone className="text-[#1ECB15] mr-1 transform rotate-90" />
            <a href={`tel:${socialMedia.numTel}`} className="font-inter text-[14px] leading-[27.2px]">{socialMedia.numTel}</a>
          </div>
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <FaEnvelope className="text-[#1ECB15] mr-1" />
            <a href={`mailto:${socialMedia.email}`} className="font-inter text-[14px] leading-[27.2px]">{socialMedia.email}</a>
          </div>
          <div className="flex items-center">
            <FaClock className="text-[#1ECB15] mr-1" />
            <span className="font-inter text-[14px] leading-[27.2px]">{socialMedia.tempsDeTravail}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {socialMedia.lienFacebook && (
            <a href={socialMedia.lienFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
          )}
          {socialMedia.lienTwitter && (
            <a href={socialMedia.lienTwitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          )}
          {socialMedia.lienYoutube && (
            <a href={socialMedia.lienYoutube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          )}
          {socialMedia.lienPinterest && (
            <a href={socialMedia.lienPinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest />
            </a>
          )}
          {socialMedia.lienInstagram && (
            <a href={socialMedia.lienInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
