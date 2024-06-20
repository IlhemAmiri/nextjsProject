import React from 'react';

const OurFeatures = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="text-center">
        <h2 className="text-4xl font-semibold leading-tight text-[42px] tracking-tighter mb-4 font-outfit">
          Our Features
        </h2>
        <p className="text-[15px] text-[#606060] font-semibold leading-5 mx-auto mb-16 font-outfit max-w-[534px]">
          Discover a world of convenience, safety, and customization, paving the way for unforgettable adventures and seamless mobility solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
        {/* Top Left Feature */}
        <div className="flex items-start max-w-[300px]">
          <div >
            <img src="/images/kes.png" alt="Icon 1" className="w-full h-full" />
          </div>
          <div className="text-xs leading-5 ml-2 font-inter tracking-tight">
            <h3 className="text-xs font-semibold mb-1">First class services</h3>
            Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.
          </div>
        </div>
        
        {/* Top Right Feature */}
        <div className="flex items-start max-w-[300px] sm:col-start-2 sm:row-start-1 lg:col-start-3 lg:row-start-1">
          <div className="text-xs leading-5 mr-2 font-inter tracking-tight text-right">
            <h3 className="text-xs font-semibold mb-1">Quality at Minimum Expense</h3>
            Reliable support when you need it most, keeping you on the move with confidence and peace of mind.
          </div>
          <div>
            <img src="/images/Expense.png" alt="Icon 2" className="w-full h-full" />
          </div>
        </div>

        {/* Center Image */}
        <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 flex justify-center order-first lg:order-none">
          <img src="/images/car-2.png" alt="Car" className="w-[600px] h-auto px-3" />
        </div>

        {/* Bottom Left Feature */}
        <div className="flex items-start max-w-[300px]">
          <div >
            <img src="/images/road.png" alt="Icon 3" className="w-full h-full" />
          </div>
          <div className="text-xs leading-5 ml-2 font-inter tracking-tight">
            <h3 className="text-xs font-semibold mb-1">24/7 road assistance</h3>
            Unlocking affordable brilliance with elevating quality while minimizing costs for maximum value.
          </div>
        </div>
        
        {/* Bottom Right Feature */}
        <div className="flex items-start max-w-[300px] sm:col-start-2 lg:col-start-3 lg:row-start-2">
          <div className="text-xs leading-5 mr-2 font-inter tracking-tight text-right">
            <h3 className="text-xs font-semibold mb-1">Free Pick-Up & Drop-Off</h3>
            Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.
          </div>
          <div>
            <img src="/images/Pick.png" alt="Icon 4" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
