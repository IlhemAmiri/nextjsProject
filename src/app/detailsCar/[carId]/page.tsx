"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use next/navigation for App Router
import axios from 'axios';
import Link from 'next/link';
import StarRating1 from '../../component/StarRating';
import Note from '../../component/Note';


interface Car {
  _id: string;
  marque: string;
  modele: string;
  anneeFabrication: number;
  typeCarburant: string;
  typeTransmission: string;
  categorie: string;
  disponibilite: string;
  kilometrage: number;
  NbPlaces: number;
  NbPortes: number;
  climatisation: boolean;
  caracteristiques: string;
  accessoiresOptionSupp: string;
  prixParJ: number;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  conditionDeLocation: string;
  note?: number;
  offrePromotion: string;
}
interface Note {
  _id: string;
  note: number;
  idClient: string;
  commentaire?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const quarterStar = (rating % 1) >= 0.25 && (rating % 1) < 0.5;
  const halfStar = (rating % 1) >= 0.5 && (rating % 1) < 0.75;
  const threeQuarterStar = (rating % 1) >= 0.75;
  const emptyStars = 5 - fullStars - (quarterStar || halfStar || threeQuarterStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
          </svg>
        ))}
      {quarterStar && (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="quarterGrad">
              <stop offset="25%" stopColor="currentColor" className="text-yellow-500" />
              <stop offset="25%" stopColor="currentColor" className="text-gray-300" />
            </linearGradient>
          </defs>
          <path
            fill="url(#quarterGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z"
          />
        </svg>
      )}
      {halfStar && (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" className="text-yellow-500" />
              <stop offset="50%" stopColor="currentColor" className="text-gray-300" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z"
          />
        </svg>
      )}
      {threeQuarterStar && (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="threeQuarterGrad">
              <stop offset="75%" stopColor="currentColor" className="text-yellow-500" />
              <stop offset="75%" stopColor="currentColor" className="text-gray-300" />
            </linearGradient>
          </defs>
          <path
            fill="url(#threeQuarterGrad)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z"
          />
        </svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-6 h-6 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
          </svg>
        ))}
    </div>
  );
};



const CarDetailsPage = () => {
  const [hasRated, setHasRated] = useState(false);
  const { carId } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('userId'));
      setToken(localStorage.getItem('token'));
      const authStatus = localStorage.getItem('isAuth') === 'true';
      setIsAuth(authStatus);
    }
  }, []);

  useEffect(() => {
    if (carId) {
      const fetchCarDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/cars/${carId}`);
          setCar(response.data);
          setMainImage(response.data.image);
          setLoading(false);
        } catch (error) {
          console.error('There was an error fetching the car details!', error);
          setLoading(false);
        }
      };

      fetchCarDetails();
      const authStatus = localStorage.getItem('isAuth') === 'true';
      setIsAuth(authStatus);
    }
  }, [carId]);

  useEffect(() => {
    if (carId) {
      axios.get(`http://localhost:3001/notes/car/${carId}`)
        .then(response => {
          setNotes(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the notes!", error);
          setLoading(false);
        });
    }
  }, [carId]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };


  const handleRatingSubmit = async () => {
    try {
      const submitResponse = await axios.post('http://localhost:3001/notes', {
        idClient: userId,
        idVoiture: carId,
        note: rating,
        commentaire: comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (submitResponse.status === 201) {
        alert('Rating submitted successfully');
        setShowRatingForm(false);
        setCar((prevCar) => prevCar ? { ...prevCar, note: (prevCar.note || 0) + rating / 2 } : null);
        setHasRated(true);
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.message.includes('Le client a déjà donné une note pour cette voiture.')) {
          alert('You have already submitted a rating for this car.');
        } else {
          alert('An error occurred while submitting your rating. Please try again.');
        }
      } else {
        alert('An error occurred while setting up your request. Please try again.');
      }
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
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Booking</a>
              <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">My Account</a>
              <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">Blog</a>
              <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm lg:text-base">FAQ</a>
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
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Booking</a>
            <a href="/profile" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">My Account</a>
            <a href="/blogs" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">Blog</a>
            <a href="#" className="hover:text-[#1ECB15] font-outfit font-semibold text-sm">FAQ</a>
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
      <div className="container mx-auto px-[12%] py-[2%] bg-gray-100">
        <h1 className="text-center text-3xl font-bold my-8 pb-8">My Orders</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <img src={car.image} alt={car.modele} className="w-full h-80 object-cover rounded-lg shadow-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img
                src={car.image2 ? car.image2 : car.image}
                alt={car.modele}
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <img
                src={car.image3 ? car.image3 : car.image}
                alt={car.modele}
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <img
                src={car.image4 ? car.image4 : car.image}
                alt={car.modele}
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-2 text-center py-4">{car.marque} {car.modele} {car.anneeFabrication}</h2>
            <p className="text-xl text-gray-700 mb-4 text-center">Daily rate</p>
            <p className="text-[50px] font-bold text-center">${car.prixParJ}</p>
            <p className="mb-4">{car.caracteristiques}</p>
            <h3 className="text-xl font-semibold mb-2">Specifications</h3>
            <ul className="mb-4 divide-y divide-gray-300">
              <li className="flex justify-between py-2"><span>Seats</span><span className='font-bold'>{car.NbPlaces} seats</span></li>
              <li className="flex justify-between py-2"><span>Doors</span><span className='font-bold'>{car.NbPortes} doors</span></li>
              <li className="flex justify-between py-2"><span>Mileage</span><span className='font-bold'>{car.kilometrage} km</span></li>
              <li className="flex justify-between py-2"><span>Fuel Type</span><span className='font-bold'>{car.typeCarburant}</span></li>
              <li className="flex justify-between py-2"><span>Engine</span><span className='font-bold'>{car.kilometrage}</span></li>
              <li className="flex justify-between py-2"><span>Year</span><span className='font-bold '>{car.anneeFabrication}</span></li>
              <li className="flex justify-between py-2"><span>Transmission</span><span className='font-bold '>{car.typeTransmission}</span></li>
              <li className="flex justify-between py-2"><span>Category</span><span className='font-bold'>{car.categorie}</span></li>
              <li className="flex justify-between py-2"><span>Availability</span><span className='font-bold'>{car.disponibilite}</span></li>
              <li className="flex justify-between py-2"><span>AC</span><span className='font-bold'>{car.climatisation ? 'Yes' : 'No'}</span></li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Additional Accessories</h3>
            <p className="mb-4">{car.accessoiresOptionSupp}</p>
            <h3 className="text-xl font-semibold mb-2">Rental Conditions</h3>
            <p className="mb-4">{car.conditionDeLocation}</p>
            {car.offrePromotion && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Promotional Offer</h3>
                <p className="mb-4">{car.offrePromotion}</p>
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              {car.note && (
                <div className="mr-4">
                  <h3 className="text-xl font-semibold mb-2">Rating</h3>
                  <StarRating rating={car.note} />
                </div>
              )}
              <button
                onClick={() => setShowRatingForm(true)}
                className="text-[#1ECB15] rounded pl-[50px] ml-auto"
              >
                Add Your Rate
              </button>
            </div>


            <div className="mt-8">
              <Link href={`/reservation/${carId}`}>
                <div className="bg-[#1ECB15] text-white text-center px-4 py-2 rounded shadow-md hover:bg-[#17a413] transition cursor-pointer">
                  Book Now
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showRatingForm && !hasRated && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Rate this Car</h2>
            <label className="block mb-2">
              <span className="text-gray-700 font-medium">Rating (1-5):</span>
              <StarRating1 rating={rating} setRating={setRating} />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Comment:</span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRatingForm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                className="px-4 py-2 bg-[#1ECB15] text-white rounded hover:bg-[#17a612]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {hasRated && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">You have already rated this car.</h2>
            <button
              onClick={() => setShowRatingForm(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Notes for Car: {car.marque} {car.modele}</h1>
        {notes.length === 0 ? (
          <p>No notes available for this car.</p>
        ) : (
          notes.map(note => (
            <Note key={note._id} note={note} />
          ))
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;
