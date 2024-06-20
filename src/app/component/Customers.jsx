import React from 'react';
import CountUp from 'react-countup';

const Customers = () => {
  return (
    <div className="w-full h-auto bg-[url('/images/Section.jpg')] bg-cover bg-center">
      <div className="flex flex-col md:flex-row justify-between items-start p-4 md:p-[2%]">
        <div className="md:w-1/2 p-4 md:pl-[100px]">
          <h2 className="font-outfit text-[32px] md:text-[42px] mt-[20px] md:mt-[50px] font-semibold leading-[40px] md:leading-[50px] tracking-[-1.8px] text-white">
            We offer customers a wide range of 
            <span className="text-[#1ECB15]"> commercial cars</span> and <span className="text-[#1ECB15]">luxury cars for </span>
            any occasion.
          </h2>
        </div>
        <div className="md:w-1/2 p-4 md:pr-[100px]">
          <p className="mt-[20px] md:mt-[50px] font-inter text-[14px] font-normal leading-[27.2px] tracking-[-0.2px] text-white">
            At our car rental agency, we believe that everyone deserves to experience the<br />
            pleasure of driving a reliable and comfortable vehicle, regardless of their budget.<br />
            We have curated a diverse fleet of well-maintained cars, ranging from sleek sedans<br />
            to spacious SUVs, all at competitive prices. With our streamlined rental process,<br />
            you can quickly and conveniently reserve your desired vehicle. Whether you need<br />
            transportation for a business trip, family vacation, or simply want to enjoy a<br />
            weekend getaway, we have flexible rental options to accommodate your schedule.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-around py-[50px] px-4 md:px-[80px]">
        {[
          { end: 15425, label: 'Completed Orders' },
          { end: 8745, label: 'Happy Customers' },
          { end: 235, label: 'Vehicles Fleet' },
          { end: 15, label: 'Years Experience' },
        ].map((item, index) => (
          <div key={index} className="hover:scale-105 w-[250px] h-auto p-[20px] m-2 gap-[8px] rounded-[10px] bg-[#FFFFFF26] shadow-[0px_20px_40px_0px_#0013570F] flex flex-col items-center">
            <span className="font-outfit text-[32px] font-semibold leading-[32px] tracking-[0.1px] text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1ECB15] to-[#179510]">
              <CountUp start={0} end={item.end} duration={2.75} />
            </span>
            <span className="font-inter text-[14px] font-medium leading-[24px] tracking-[-0.2px] text-center text-[#FFFFFFBF]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
