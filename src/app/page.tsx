import React from 'react';
import { FaArrowUp} from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      <div className="relative h-[750px]">
        <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/11.jpg')]">
          <div className="absolute inset-0">
          <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <div className="flex justify-center">
                <a href="#">
                  <img src="/images/Container.png" alt="Logo" className='w-[156px] h-[56px]' />
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <nav className="flex space-x-16">
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Home</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Cars</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Booking</a>
                  <a href="#" className="hover:text-[#1ECB15]font-outfit font-semibold text-[16px] leading-[27.2px]">My Account</a>
                  <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-[16px] leading-[27.2px]">Blog</a>
                  <a href="#" className="hover:text-[#1ECB15]font-outfit font-semibold text-[16px] leading-[27.2px]">FAQ</a>
                </nav>
              </div>
              <a href="#" className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 leading-7 font-extrabold text-sm tracking-wide font-outfit">
                Sign In
              </a>

            </div>
            <div className="absolute top-1/3 left-[12%] w-[600px] h-[424.56px]">
              <h1 className="font-outfit font-medium text-white text-[52px] leading-[52px] tracking-[-2px] mb-8">
                Explore the world with comfortable car
              </h1>
              <p className="font-inter text-base font-normal leading-6 tracking-tight text-left text-white mb-8">
                Embark on unforgettable adventures and discover the world in unparalleled
                comfort and style with our fleet of exceptionally comfortable cars.
              </p>

              <button className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-36 h-9 mt-4 font-bold text-sm tracking-wide">
                Choose a Car
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* New Section */}
      <div className="bg-gray-100">
        <div className="pt-16 px-[12%]">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px] mb-4">Our Vehicle Fleet</h2>
            <p className="font-inter text-[16px] font-normal leading-[27.2px] tracking-[-0.2px]">
              Driving your dreams to reality with an exquisite fleet of versatile vehicles for unforgettable journeys.
            </p>
          </div>
          <div className="flex justify-end mb-8">
            <a href="#" className="flex items-center text-[#050B20] text-sm ">
              View All <img src="/images/arrow.png" alt="" className='ml-2'/>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {[
              { price: '$195,000', img: '/images/2.jpg' },
              { price: '$140,000', img: '/images/11.jpg' },
              { price: '$95,000', img: '/images/2.jpg' },
              { price: '$195,000', img: '/images/bg1.jpg' },
            ].map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md mb-20transition-transform transform hover:scale-105">
                <div className="relative">
                  <img src={car.img} alt="Car" className="rounded-t-lg w-full h-[218.33px] object-cover" />
                  <div className="absolute top-[20.05px] left-[20px] bg-[#1ECB15] text-white rounded-[30px] px-[15px] py-[2.94px] text-sm" >
                    Great Price
                  </div>

                  <div className="absolute top-0 right-0 p-2">
                    <button className='mt-2'>
                      <img src="/images/save.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-dm-sans text-[18px] font-bold leading-[21.6px]">Toyota Camry New</h3>
                  <p className="font-dm-sans text-[14px] leading-[14px] mt-2">3.5 D5 PowerPulse Momentum 5dr AWD</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center">
                      <img src="/images/Miles.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">20 Miles</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Petrol.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">Petrol</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Automatic.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]"> Automatic</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/cal.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">2023</span>
                    </div>
                  </div>
                  <hr className="my-4 border-[#E9E9E9]" />
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-dm-sans text-[20px] font-bold leading-[30px]">$195,000</span>
                    <a href="#" className="text-[#1ECB15] text-sm flex items-center text-[15px]">
                      View Details <FaArrowUp className="ml-1 rotate-45" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Nouvelle section avec une image de fond */}

        <div className="relative w-full h-[558.3px] mt-16 bg-[url('/images/Section.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold">New Section Content</h2>
          </div>
        </div>
      </div>
      {/* Nouvelle section avec une image de fond */}
      <div className="relative w-full h-[438px] mt-16  rounded-tl-lg">
        {/* Contenu de la nouvelle section */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-gray-700 text-4xl font-bold">Another Section Content</h2>
        </div>
      </div>

    </div>
  );
};

export default Home;
