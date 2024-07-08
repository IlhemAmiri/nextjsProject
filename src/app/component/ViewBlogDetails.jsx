import React from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: "easeInOut" }
};

const ViewBlogDetails = ({ blog }) => {
    return (
        <div>
            <div className="container mx-auto p-4 text-center">
                <motion.h1
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="text-4xl font-bold my-12 pb-2"
                >
                    {blog.title}
                </motion.h1>
                <motion.img
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    src={blog.image}
                    alt={blog.title}
                    className="mx-auto w-[50%] h-[50%] object-cover object-center mb-4 rounded-lg shadow-lg"
                />
                <p className="text-gray-600 mb-4">{blog.author} · {new Date(blog.date).toLocaleDateString()}</p>
                <p className="text-lg mb-6 text-gray-700">{blog.summary}</p>
            </div>
            <div className="content space-y-6 mx-[10%] p-8">
                {blog.content.map((section, index) => (
                    <InView key={index} triggerOnce={false}>
                        {({ inView, ref }) => (
                            <motion.div
                                ref={ref}
                                initial="initial"
                                animate={inView ? "animate" : "initial"}
                                variants={fadeInUp}
                                className="content-section"
                            >
                                {section.title && (
                                    <h2 className="text-3xl font-semibold mb-8 text-[#1ECB15]">
                                        {section.title}
                                    </h2>
                                )}
                                <p className="text-lg text-gray-700 font-semibold mb-8">{section.text}</p>
                            </motion.div>
                        )}
                    </InView>
                ))}
            </div>
        </div>
    );
};

export default ViewBlogDetails;
