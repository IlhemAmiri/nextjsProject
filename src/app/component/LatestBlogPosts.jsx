import React from 'react';
import Link from 'next/link';

const LatestBlogPosts = ({ blogs, formatDate }) => {
  return (
    <div className="bg-gray-100 px-20 pt-12 pb-[150px]">
      <div className="text-center">
        <h2 className="text-[#050B20] font-dm-sans text-4xl font-bold leading-tight py-10 pb-20">
          Latest Blog Posts
        </h2>
      </div>
      <div className="flex justify-end mb-8">
        <Link href="/blogs">
          <div className="flex items-center text-[#050B20] text-sm cursor-pointer">
            View All <img src="/images/arrow.png" alt="" className="ml-2" />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {blogs.map(blog => (
          <div key={blog._id} className="w-full max-w-[463px] mx-auto">
            <div className="w-full h-[308px] rounded-[17px] overflow-hidden relative bg-white">
              <Link href={`/viewBlog/${blog._id}`}>
                <div className="relative block w-full h-full group">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform transform group-hover:scale-110 group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                    <span className="text-white text-lg font-bold">View Details</span>
                  </div>
                </div>
              </Link>                <div className="bg-white py-1 px-4 rounded-full absolute top-4 left-4 shadow">
                <span className="text-[#050B20] font-dm-sans text-sm font-medium leading-tight">{blog.category}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">{blog.author} · {formatDate(blog.date)}</p>
              <h3 className="mt-2 text-[#050B20] font-dm-sans text-xl font-medium leading-tight">{blog.summary}</h3>
              {/* <p className="mt-1 text-[#050B20] opacity-75 font-dm-sans text-sm leading-tight">{blog.title}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogPosts;