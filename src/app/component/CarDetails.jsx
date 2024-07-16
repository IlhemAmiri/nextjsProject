import React from 'react';
import Link from 'next/link';
import StarRating1 from './StarRating1';
import StarRating from './StarRating';

const CarDetails = ({
    car,
    showRatingForm,
    hasRated,
    setShowRatingForm,
    handleRatingSubmit,
    rating,
    setRating,
    comment,
    setComment
}) => {
    return (
        <div>
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
                                Rate This Car
                            </button>
                        </div>


                        <div className="mt-8">
                            <Link href={`/reservation/${car._id}`}>
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
        </div>
    );
};

export default CarDetails;