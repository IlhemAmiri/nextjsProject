"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavBlog from '../component/NavBlog';
import AllBlogs from '../component/AllBlogs'

interface Blog {
    _id: string;
    title: string;
    author: string;
    date: string;
    category: string;
    image: string;
    summary: string;
}

const PageBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isAuth, setIsAuth] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 12;
    const [totalBlogs, setTotalBlogs] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const fetchBlogs = async (page: number) => {
            try {
                const res = await axios.get(`http://localhost:3001/blogs?page=${page}&limit=${blogsPerPage}`);
                setBlogs(res.data.data);
                setTotalBlogs(res.data.total);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };

        fetchBlogs(currentPage);

        // Check authentication status from local storage
        const authStatus = localStorage.getItem('isAuth') === 'true';
        setIsAuth(authStatus);
    }, [currentPage]);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false);
        router.push('/signin');
    };

    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div>
            <NavBlog isAuth={isAuth} handleLogout={handleLogout} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <AllBlogs
                blogs={blogs}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                formatDate={formatDate}
            />
        </div>
    );
};

export default PageBlogs;