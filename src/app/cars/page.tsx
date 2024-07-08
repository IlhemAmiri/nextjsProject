"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavCars from '../component/NavCars';
import CarList from '../component/CarList';
import CheckBox from '../component/CheckBox';

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
      <NavCars isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="bg-gray-100">
        <div className="text-center pt-12">
          <h2 className="font-outfit text-[42px] font-semibold leading-[50px] tracking-[-1.8px]">Explore All Vehicles</h2>
        </div>
        <div className="pt-16 px-4 md:px-[10%] flex flex-col lg:flex-row">
          <CheckBox
            searchParams={searchParams}
            handleVehicleTypeChange={handleVehicleTypeChange}
            handleBodyTypeChange={handleBodyTypeChange}
            handleSeatsChange={handleSeatsChange}
            handlePriceRangeChange={handlePriceRangeChange}
            priceRange={priceRange}
          />
          <CarList cars={cars} handleToggleFavourite={handleToggleFavourite} favourites={favourites} />
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
