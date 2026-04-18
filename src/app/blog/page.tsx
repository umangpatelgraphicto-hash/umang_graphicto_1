"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/utils/footer";
import { mockPosts } from "@/components/utils/mockData";
import Header from "@/components/utils/blogheader";

const BlogPage: React.FC = () => {
  return (
    <div className="bg-white" suppressHydrationWarning>
      <div className="bg-gray-100 ">
        {" "}
        <Header title={""} content={""} />
        <h1 className="text-center pb-24 text-4xl  font-sans text-[#444F60]">
          Blog
        </h1>
      </div>

      <div className="grid p-10 mt-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={post.coverImage.width}
              height={post.coverImage.height}
              className="w-full h-64 mb-4 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl mt-4 text-gray-700 font-semibold">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-3">{post.content}</p>
              <p className="text-sm mt-3 text-gray-500">
                Published on: {post.publishedDate}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
