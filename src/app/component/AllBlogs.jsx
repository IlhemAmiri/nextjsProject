import React from 'react';

const AllBlogs = ({ blogs, currentPage, setCurrentPage, totalPages, formatDate }) => {
    return (
        <div className="bg-gray-100 px-20 pt-12 pb-[150px]">
            <div className="text-center">
                <h2 className="text-[#050B20] font-dm-sans text-4xl font-bold leading-tight py-2 pb-20">
                    Blog Posts
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {blogs.map(blog => (
                    <div key={blog._id} className="w-full max-w-[463px] mx-auto">
                        <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white shadow-lg">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                                <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">{blog.category}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">{blog.author} · {formatDate(blog.date)}</p>
                            <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">{blog.summary}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-8 pb-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                            localStorage.setItem('currentPage', newPage.toString());
                        }}
                        className={`w-[36px] h-[36px] ${index + 1 === currentPage ? 'bg-[#1ECB15] text-white' : 'bg-transparent text-black'} rounded-md mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-[36px] h-[36px] rounded-r-md ${currentPage === totalPages ? 'opacity-0' : ''}`}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default AllBlogs;
