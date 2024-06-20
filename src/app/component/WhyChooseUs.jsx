import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="w-full bg-[#F9FBFC] rounded-tl-lg py-16">
      {/* Section Title */}
      <h2 className="text-center font-dm-sans text-[32px] md:text-[42px] font-bold text-gray-900 mb-12">
        Why Choose Us?
      </h2>

      {/* Features */}
      <div className="flex flex-wrap justify-center md:justify-between gap-6 px-4 md:px-10">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] m-2 p-4 ">
          <img src="/images/Financing.png" alt="Special Financing Offers" className="w-[40px] h-[40px] mb-4" />
          <h3 className="font-dm-sans text-[18px] font-medium mb-2">Special Financing Offers</h3>
          <p className="font-dm-sans text-[14px] font-normal leading-[22px]">
            Our stress-free finance department that can find financial solutions to save you money.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] m-2 p-4 ">
          <img src="/images/Dealership.png" alt="Trusted Car Dealership" className="w-[40px] h-[40px] mb-4" />
          <h3 className="font-dm-sans text-[18px] font-medium mb-2">Trusted Car Dealership</h3>
          <p className="font-dm-sans text-[14px] font-normal leading-[22px]">
            Our stress-free finance department that can find financial solutions to save you money.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] m-2 p-4 ">
          <img src="/images/Pricing.png" alt="Transparent Pricing" className="w-[40px] h-[40px] mb-4" />
          <h3 className="font-dm-sans text-[18px] font-medium mb-2">Transparent Pricing</h3>
          <p className="font-dm-sans text-[14px] font-normal leading-[22px]">
            Our stress-free finance department that can find financial solutions to save you money.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center w-[calc(50%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)] m-2 p-4 ">
          <img src="/images/Service.png" alt="Expert Car Service" className="w-[40px] h-[40px] mb-4" />
          <h3 className="font-dm-sans text-[18px] font-medium mb-2">Expert Car Service</h3>
          <p className="font-dm-sans text-[14px] font-normal leading-[22px]">
            Our stress-free finance department that can find financial solutions to save you money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
