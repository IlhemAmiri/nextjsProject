"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import OurVehicle from './component/OurVehicle';
import AccueilHome from './component/AccueilHome';
import Customers from './component/Customers';
import WhyChooseUs from './component/WhyChooseUs';
import OurFeatures from './component/OurFeatures';
import Quality from './component/Quality';
import PremiumBrands from './component/PremiumBrands';
import LatestBlogPosts from './component/LatestBlogPosts';

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
}

interface Blog {
  _id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  summary: string;
}

const Home = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios.get('http://localhost:3001/cars?page=1&limit=4')
      .then(response => {
        console.log(response.data);
        setCars(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car data!', error);
      });
      axios.get('http://localhost:3001/blogs?page=1&limit=3')
      .then(response => {
        console.log(response.data);
        setBlogs(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blog data!', error);
      });
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    router.push('/signin');
  };


  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <AccueilHome isAuth={isAuth} handleLogout={handleLogout} />
      <OurVehicle cars={cars} />
      <Customers />
      <WhyChooseUs />
      <OurFeatures />
      <Quality />
      <PremiumBrands />    
      <LatestBlogPosts blogs={blogs} formatDate={formatDate} />    </div>
  );
};

export default Home;