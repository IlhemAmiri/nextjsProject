import React, { useState } from 'react';

const Quality = () => {
  const [activeButton, setActiveButton] = useState('luxury');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-[492.94px]">
        <img
          src="/images/sec.jpg"
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 bg-[#121212] flex flex-col justify-center px-6 lg:px-[100px] py-8 lg:py-0">
        <h1 className="text-white font-outfit text-[32px] lg:text-[42px] font-semibold leading-tight tracking-[-1.8px] text-left mb-6">
          Only Quality For Clients
        </h1>
        <div className="flex space-x-2 mb-6">
          <button
            className={`focus:outline-none ${activeButton === 'luxury' ? 'bg-[#1ECB15] text-white' : 'bg-[#00000080] text-white'} w-[90px] lg:w-[123px] h-[45px] lg:h-[61px] py-2 rounded-lg transition duration-300 ease-in-out`}
            onClick={() => handleButtonClick('luxury')}
          >
            Luxury
          </button>
          <button
            className={`focus:outline-none ${activeButton === 'comfort' ? 'bg-[#1ECB15] text-white' : 'bg-[#00000080] text-white'} w-[90px] lg:w-[123px] h-[45px] lg:h-[61px] py-2 rounded-lg transition duration-300 ease-in-out`}
            onClick={() => handleButtonClick('comfort')}
          >
            Comfort
          </button>
          <button
            className={`focus:outline-none ${activeButton === 'prestige' ? 'bg-[#1ECB15] text-white' : 'bg-[#00000080] text-white'} w-[90px] lg:w-[123px] h-[45px] lg:h-[61px] py-2 rounded-lg transition duration-300 ease-in-out`}
            onClick={() => handleButtonClick('prestige')}
          >
            Prestige
          </button>
        </div>

        <p className="text-white font-inter text-[14px] lg:text-[16px] leading-[24px] lg:leading-[27.2px] text-left opacity-75 max-w-lg">
          {activeButton === 'luxury' && (
            "We offer a meticulously curated collection of the most sought-after luxury vehicles on the market. Whether you prefer the sporty allure of a high-performance sports car, the sophistication of a sleek and luxurious sedan, or the versatility of a premium SUV, we have the perfect car to match your discerning taste."
          )}
          {activeButton === 'comfort' && (
            "Discover unparalleled comfort with our selection of premium vehicles designed to exceed your expectations. Enjoy the latest in comfort and convenience features that make every journey a pleasure."
          )}
          {activeButton === 'prestige' && (
            "Experience the pinnacle of automotive excellence with our prestigious range of vehicles. Each model combines cutting-edge technology with unparalleled craftsmanship to elevate your driving experience."
          )}
        </p>
      </div>
    </div>
  );
};

export default Quality;
