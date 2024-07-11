import Link from 'next/link';
import { useState } from 'react';

const AccueilHome = ({ isAuth, handleLogout, client }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-cover bg-center bg-[url('/images/11.jpg')]">
      <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
        {/* <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-[12%] h-[102px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"> si t7eb padding x*/}
        <div className="flex justify-center">
          <a href="/">
            <img src="/images/Container.png" alt="Logo" className='w-40 h-14' />
          </a>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex space-x-4 lg:space-x-20">
            <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
            <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
            {/* <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Booking</a> */}
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blogs</a>
            <a href="/faq" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">FAQs</a>
          </nav>
        </div>
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {isAuth ? (
          <div className="hidden md:flex items-center">
            {client && (
              <a href="/profile">
                <img src={client.image} alt="Profile" className="rounded-full w-10 h-10 mr-4 border-2 border-[#1ECB15]" />
              </a>
            )}
            <button
              onClick={handleLogout}
              className="bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/signin">
            <div className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
              Sign In
            </div>
          </Link>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[rgba(41,41,41,0.8)] text-white flex flex-col items-center space-y-4 py-4 pr-6">
          <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Home</a>
          <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Cars</a>
          {/* <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a> */}
          <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
          <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blogs</a>
          <a href="/faq" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQs</a>
          {client && (
            <a href="/profile">
              <img src={client.image} alt="Profile" className="rounded-full w-8 h-8 mr-4 border-2 border-[#1ECB15]" />
            </a>
          )}
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link href="/signin">
              <div className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105">
                Sign In
              </div>
            </Link>
          )}
        </div>
      )}
      <div className="flex flex-col justify-start h-full px-6 lg:px-12 mt-16 lg:mt-32">
        <div className="w-full lg:w-[600px]">
          <h1 className="font-outfit font-medium text-white text-3xl lg:text-5xl leading-tight lg:leading-snug tracking-tight mb-4 lg:mb-8">
            Explore the world with comfortable car
          </h1>
          <p className="font-inter text-sm lg:text-base font-normal leading-6 lg:leading-8 tracking-tight text-left text-white mb-4 lg:mb-8">
            Embark on unforgettable adventures and discover the world in unparalleled
            comfort and style with our fleet of exceptionally comfortable cars.
          </p>
          <Link href="/cars">
            <button className="bg-[#1ECB15] text-white flex items-center justify-center rounded w-36 h-9 mt-4 font-bold text-sm tracking-wide hover:scale-105">
              Choose a Car
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccueilHome;
