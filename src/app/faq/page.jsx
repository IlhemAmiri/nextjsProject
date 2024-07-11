"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import NavProfile from '../component/NavProfile';
import FAQuestion from '../component/FAQuestion';

export default function FAQPage() {
    const [faqs, setFaqs] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);

        const fetchFaqs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/faq');
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        const fetchClientData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!userId || !token) return;
                const response = await axios.get(`http://localhost:3001/users/clients/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setClient(response.data);
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchFaqs();

        if (authStatus) {
            fetchClientData();
        }
    }, []);
    const toggleFaq = (index) => {
        setOpenIndexes((prevOpenIndexes) =>
            prevOpenIndexes.includes(index)
                ? prevOpenIndexes.filter((i) => i !== index)
                : [...prevOpenIndexes, index]
        );
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };
    return (
        <div className='bg-white'>
            <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client} />
            <FAQuestion faqs={faqs} openIndexes={openIndexes} toggleFaq={toggleFaq} />
        </div>
    );
}
