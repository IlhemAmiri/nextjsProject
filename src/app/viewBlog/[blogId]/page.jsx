"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import NavProfile from '../../component/NavProfile';
import ViewBlogDetails from '../../component/ViewBlogDetails';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const params = useParams();
    const router = useRouter();
    const blogId = params.blogId;
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);

        if (authStatus) {
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
                    console.error('Failed to fetch client data:', error);
                }
            };
            fetchClientData();
        }

        if (!blogId) return;

        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/blogs/${blogId}`);
                setBlog(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch blog details');
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src="/images/loading.gif" alt="Loading..." className="w-[250px]" />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    return (
        <div className='bg-white'>
            <NavProfile isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} client={client} />
            {blog && <ViewBlogDetails blog={blog} />}
        </div>
    );
};

export default BlogDetails;
