"use client";
import React, { useState, useEffect } from 'react';
import NavProfile from '../component/NavProfile'
import { useRouter } from 'next/navigation';

const AddBlogPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('Admin');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState([{ title: '', text: '' }]);
    const [error, setError] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin');
        if (role !== 'admin') {
            router.push('/');
        }

        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
        // Automatically set the date to today's date
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('summary', summary);
        formData.append('image', image);
        formData.append('content', JSON.stringify(content));


        try {
            const response = await fetch('http://localhost:3001/blogs', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add blog');
            }

            router.push('/blogs');
        } catch (error) {
            setError('Failed to add blog');
        }
    };
    const handleContentChange = (index, field, value) => {
        const newContent = [...content];
        newContent[index][field] = value;
        setContent(newContent);
    };

    const addContentSection = () => {
        setContent([...content, { title: '', text: '' }]);
    };


    if (!isMounted || !isAdmin) {
        return null;
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    return (
        <div>
            <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className="flex flex-col items-center justify-center flex-1 my-16">
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-10">
                    <h2 className="text-gray-800 font-semibold text-2xl mb-6">Add Blog</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* <div className="col-span-2">
                            <label className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div> */}
                        <div className="col-span-2">
                            <label className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Summary</label>
                            <textarea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            ></textarea>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {content.map((section, index) => (
                            <div key={index} className="col-span-2">
                                <label className="block text-gray-700">Section Title</label>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => handleContentChange(index, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <label className="block text-gray-700">Section Text</label>
                                <textarea
                                    value={section.text}
                                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                ></textarea>
                            </div>
                        ))}
                        <div className="col-span-2">
                            <button
                                type="button"
                                onClick={addContentSection}
                                className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded-md hover:bg-[#16A314] transition-colors"
                            >
                                Add Section
                            </button>
                        </div>
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-[#1ECB15] text-white py-2 px-4 rounded-md hover:bg-[#16A314] transition-colors"
                            >
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBlogPage;