"use client";

import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Car {
  _id: string;
  image: string;
  modele: string;
  marque: string;
  categorie: string;
  kilometrage: number;
  typeCarburant: string;
  typeTransmission: string;
  anneeFabrication: number;
  prixParJ: number;
  vehicleType: string;
}
interface SearchParams {
  [key: string]: string;
}
const Page = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem('currentPage') || '1', 10);
  });
  const [itemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({
    vehicleType: '',
    bodyType: '',
    seats: '',
    minPrice: '0',
    maxPrice: '10000',
  });
  const [priceRange, setPriceRange] = useState<number>(10000);

  const router = useRouter();

  useEffect(() => {
    const fetchFavourites = async () => {
      const clientId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!clientId || !token) {
        console.error('Client ID or token is missing');
        return;
      }

      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:3001/favorite-cars/client/${clientId}`, config);
        const favouriteCars = response.data.map((fav: any) => fav.idVoiture);
        setFavourites(new Set(favouriteCars));
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, []);

  const handleToggleFavourite = async (carId: string) => {
    const clientId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!clientId || !token) {
      console.error('Client ID or token is missing');
      alert('Please log in to add to favourites');
      return;
    }

    const isFavourite = favourites.has(carId);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (!isFavourite) {
        await axios.post('http://localhost:3001/favorite-cars', { idClient: clientId, idVoiture: carId }, config);
        setFavourites((prev) => {
          const newFavourites = new Set(prev);
          newFavourites.add(carId);
          return newFavourites;
        });
        console.log(`Car ${carId} added to favourites`);
      } else {
        await axios.delete('http://localhost:3001/favorite-cars', {
          data: { idClient: clientId, idVoiture: carId },
          ...config,
        });
        setFavourites((prev) => {
          const newFavourites = new Set(prev);
          newFavourites.delete(carId);
          return newFavourites;
        });
        console.log(`Car ${carId} removed from favourites`);
      }
    } catch (error: any) {
      console.error('Error toggling favourite:', error);
      alert(`An error occurred while toggling favourite status: ${error.response?.data?.message || error.message}`);
    }
  };

  const fetchCars = async (params = {}) => {
    try {
      const response = await axios.get(`http://localhost:3001/cars/recherche/check`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          ...params,
        },
      });
      setCars(response.data.data);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error('There was an error fetching the car data!', error);
    }
  };

  useEffect(() => {
    fetchCars(searchParams);
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCars(searchParams);
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      localStorage.setItem('currentPage', nextPage.toString());
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      localStorage.setItem('currentPage', prevPage.toString());
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page.toString());
  };


  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setSearchParams((prevParams) => {
        if (checked) {
          return {
            ...prevParams,
            [name]: value,
          };
        } else {
          const newParams = { ...prevParams };
          delete newParams[name];
          return newParams;
        }
      });
    } else {
      setSearchParams((prevParams) => ({
        ...prevParams,
        [name]: value,
      }));
    }
  };


  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange(value);
    setSearchParams((prevParams) => ({
      ...prevParams,
      minPrice: '0',
      maxPrice: value.toString(),
    }));
  };
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        vehicleType: value,
      }));
    } else {
      setSearchParams((prevParams) => {
        const newParams = { ...prevParams };
        delete newParams.vehicleType;
        return newParams;
      });
    }
  };
  const handleBodyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        bodyType: value,
      }));
    } else {
      setSearchParams((prevParams) => {
        const newParams = { ...prevParams };
        delete newParams.bodyType;
        return newParams;
      });
    }
  };
  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        seats: value,
      }));
    } else {
      setSearchParams((prevParams) => {
        const newParams = { ...prevParams };
        delete newParams.seats;
        return newParams;
      });
    }
  };


  return (
    <div>
      <div className="h-[400px] bg-cover bg-center bg-[url('/images/11.jpg')]">
        <div className="bg-[rgba(41,41,41,0.38)] backdrop-blur-md bg-opacity-30 text-white flex justify-between items-center px-6 lg:px-12 py-4 shadow-md">
          <div className="flex justify-center">
            <a href="#">
              <img src="/images/Container.png" alt="Logo" className='w-40 h-14' />
            </a>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex space-x-4 lg:space-x-20">
              <a href="/" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Home</a>
              <a href="/cars" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Cars</a>
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
            <button
              onClick={handleLogout}
              className="hidden md:flex bg-[#1ECB15] text-white items-center justify-center rounded w-28 h-9 font-extrabold text-sm tracking-wide font-outfit transition-transform hover:scale-105"
            >
              Logout
            </button>
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
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blogs</a>
            <a href="/faq" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQs</a>
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
      </div>

      <div className="bg-gray-100">
        <div className="text-center pt-12">
          <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px]">Explore All Vehicles</h2>
        </div>
        <div className="pt-16 px-4 md:px-[10%] flex flex-col lg:flex-row">
          <div className="w-full lg:w-[336px] h-auto mb-8 lg:mb-0 lg:mr-12">
            <div className="bg-white p-6 rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
              <h3 className="font-semibold">Vehicle Type</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" name="vehicleType" value="Car" checked={searchParams.vehicleType === 'Car'} onChange={handleVehicleTypeChange} /> Car</label>
                <label><input type="checkbox" name="vehicleType" value="Van" checked={searchParams.vehicleType === 'Van'} onChange={handleVehicleTypeChange} /> Van</label>
                <label><input type="checkbox" name="vehicleType" value="Minibus" checked={searchParams.vehicleType === 'Minibus'} onChange={handleVehicleTypeChange} /> Minibus</label>
                <label><input type="checkbox" name="vehicleType" value="Prestige" checked={searchParams.vehicleType === 'Prestige'} onChange={handleVehicleTypeChange} /> Prestige</label>

              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
              <h3 className="font-semibold">Car Body Type</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" name="bodyType" value="Compact" checked={searchParams.bodyType === 'Compact'} onChange={handleBodyTypeChange} /> Compact</label>
                <label><input type="checkbox" name="bodyType" value="Convertible" checked={searchParams.bodyType === 'Convertible'} onChange={handleBodyTypeChange} /> Convertible</label>
                <label><input type="checkbox" name="bodyType" value="Coupe" checked={searchParams.bodyType === 'Coupe'} onChange={handleBodyTypeChange} /> Coupe</label>
                <label><input type="checkbox" name="bodyType" value="Exotic Cars" checked={searchParams.bodyType === 'Exotic Cars'} onChange={handleBodyTypeChange} /> Exotic Cars</label>
                <label><input type="checkbox" name="bodyType" value="Hatchback" checked={searchParams.bodyType === 'Hatchback'} onChange={handleBodyTypeChange} /> Hatchback</label>
                <label><input type="checkbox" name="bodyType" value="Minivan" checked={searchParams.bodyType === 'Minivan'} onChange={handleBodyTypeChange} /> Minivan</label>
                <label><input type="checkbox" name="bodyType" value="Truck" checked={searchParams.bodyType === 'Truck'} onChange={handleBodyTypeChange} /> Truck</label>
                <label><input type="checkbox" name="bodyType" value="Sedan" checked={searchParams.bodyType === 'Sedan'} onChange={handleBodyTypeChange} /> Sedan</label>
                <label><input type="checkbox" name="bodyType" value="Sports Car" checked={searchParams.bodyType === 'Sports Car'} onChange={handleBodyTypeChange} /> Sports Car</label>
                <label><input type="checkbox" name="bodyType" value="Station Wagon" checked={searchParams.bodyType === 'Station Wagon'} onChange={handleBodyTypeChange} /> Station Wagon</label>
                <label><input type="checkbox" name="bodyType" value="SUV" checked={searchParams.bodyType === 'SUV'} onChange={handleBodyTypeChange} /> SUV</label>

              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33] mb-6">
              <h3 className="font-semibold">Number of Seats</h3>
              <div className="flex flex-col gap-2 mt-2">
                <label><input type="checkbox" name="seats" value="2" checked={searchParams.seats === '2'} onChange={handleSeatsChange} /> 2 seats</label>
                <label><input type="checkbox" name="seats" value="4" checked={searchParams.seats === '4'} onChange={handleSeatsChange} /> 4 seats</label>
                <label><input type="checkbox" name="seats" value="5" checked={searchParams.seats === '5'} onChange={handleSeatsChange} /> 5 seats</label>
                <label><input type="checkbox" name="seats" value="6" checked={searchParams.seats === '6'} onChange={handleSeatsChange} /> 6 seats</label>
                <label><input type="checkbox" name="seats" value="7" checked={searchParams.seats === '7'} onChange={handleSeatsChange} /> 7 seats</label>

              </div>
            </div>
            <div className="bg-white p-6 border-t rounded shadow-[3px_3px_9px_0px_#A4A4BA33]">
              <h3 className="font-semibold text-lg mb-2">Price ($)</h3>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="w-full"
                />
                <span className="font-semibold">
                  ${priceRange.toLocaleString()} - $10,000
                </span>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>$0</span>
                <span>$10,000</span>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(cars) && cars.map((car, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md mb-20 transition-transform transform hover:scale-105 min-h-[300px] max-h-[450px]">
                <div className="relative">
                  <img src={car.image} alt={car.modele} className="rounded-t-lg w-full h-[218.33px] object-cover" />
                  <div className="absolute top-[20.05px] left-[20px] bg-[#1ECB15] text-white rounded-[30px] px-[15px] py-[2.94px] text-sm">
                    Great Price
                  </div>
                  <div className="absolute top-0 right-0 p-2">
                    <button onClick={() => handleToggleFavourite(car._id)}>
                      <img src={favourites.has(car._id) ? "/images/save2.png" : "/images/save.png"} alt="Favourite" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-dm-sans text-[18px] font-bold leading-[21.6px]">{car.marque} {car.modele}</h3>
                  <p className="font-dm-sans text-[14px] leading-[14px] mt-2">{car.categorie}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center">
                      <img src="/images/Miles.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.kilometrage} Miles</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Petrol.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.typeCarburant}</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/Automatic.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.typeTransmission}</span>
                    </div>
                    <div className="flex items-center">
                      <img src="/images/cal.png" alt="" className="mr-2" />
                      <span className="font-dm-sans text-[14px] leading-[14px]">{car.anneeFabrication}</span>
                    </div>
                  </div>
                  <hr className="my-4 border-[#E9E9E9]" />
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-dm-sans text-[20px] font-bold leading-[30px]">${car.prixParJ}</span>
                    <Link href={`/detailsCar/${car._id}`}>
                      <div className="text-[#1ECB15] text-sm flex items-center text-[15px] cursor-pointer">
                        View Details <FaArrowUp className="ml-1 rotate-45" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 pb-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`w-[36px] h-[36px] rounded-l-md ${currentPage === 1 ? 'opacity-0 ' : ''}`}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                const newPage = index + 1;
                setCurrentPage(newPage);
                localStorage.setItem('currentPage', newPage.toString()); // Stocker la page actuelle
              }}
              className={`w-[36px] h-[36px] ${index + 1 === currentPage ? 'bg-[#1ECB15] text-white' : 'bg-transparent text-black'} rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-[36px] h-[36px] rounded-r-md ${currentPage === totalPages ? 'opacity-0' : ''}`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
