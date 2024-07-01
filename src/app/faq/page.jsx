"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import NavProfile from '../component/NavProfile';

export default function FAQPage() {
    const [faqs, setFaqs] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

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

        fetchFaqs();
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
        <div>
            <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-extrabold text-center mb-12">Frequently Asked Questions</h1>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full sm:w-1/2 px-4">
                        {faqs.filter((_, i) => i % 2 === 0).map((faq, index) => (
                            <div key={index} className="mb-8">
                                <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                    <div
                                        className="p-6 flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                                        <button className="text-2xl font-bold text-green-500">
                                            {openIndexes.includes(index) ? '−' : '+'}
                                        </button>
                                    </div>
                                    <div
                                        className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndexes.includes(index) ? 'max-h-screen' : 'max-h-0'
                                            }`}
                                    >
                                        {openIndexes.includes(index) && (
                                            <div className="p-6 bg-gray-50 border-t border-gray-300">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full sm:w-1/2 px-4">
                        {faqs.filter((_, i) => i % 2 !== 0).map((faq, index) => (
                            <div key={index + faqs.length} className="mb-8">
                                <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                                    <div
                                        className="p-6 flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100"
                                        onClick={() => toggleFaq(index + faqs.length)}
                                    >
                                        <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                                        <button className="text-2xl font-bold text-green-500">
                                            {openIndexes.includes(index + faqs.length) ? '−' : '+'}
                                        </button>
                                    </div>
                                    <div
                                        className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndexes.includes(index + faqs.length) ? 'max-h-screen' : 'max-h-0'
                                            }`}
                                    >
                                        {openIndexes.includes(index + faqs.length) && (
                                            <div className="p-6 bg-gray-50 border-t border-gray-300">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
