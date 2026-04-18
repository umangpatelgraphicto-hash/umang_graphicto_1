import React from "react";
import Footer from "@/components/utils/footer";
import Image from "next/image";
import { mockPosts } from "@/components/utils/mockData";
import Header from "@/components/utils/blogheader";

interface PageProps {
  params: Promise<{ id: string }>;
}

const PostDetail = async ({ params }: PageProps) => {
  const { id } = await params;

  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white" suppressHydrationWarning>
      <div className="bg-gray-100 h-auto pb-10 top-0 left-0 w-full">
        <Header title={""} content={""} />
        <h1 className="text-4xl pl-10 pr-10 font-sans text-[#444F60] sm:text-center  md:text-center lg:text-center lg:ml-20 lg:mr-20">
          {post.title}
        </h1>
        <p className="text-gray-600  text-xl font-sans font-light mt-5 pl-10 pr-10 sm:text-center  md:text-center lg:text-center lg:ml-20 lg:mr-20">
          {post.content}
        </p>
      </div>

      <div className="container responsive-container mt-10 p-6  ">
      <Image
  src={post.coverImage.src}
  alt={post.coverImage.alt}
  width={post.coverImage.width}
  height={post.coverImage.height}
  className="w-full max-w-[800px]  h-auto mb-4 object-cover mx-auto "
/>

        <p className="  mt-10  text-2xl text-black font-sans sm:text-center md:text-center  lg:text-left lg:mr-56 lg:ml-56">
          {post.content}
        </p>
        <p className="  mt-7  text-lg font-extralight text-gray-500 font-sans sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.fullContent}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext1}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext1}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext2}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext2}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext3}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext3}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext4}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext4}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext5}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext5}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext6}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext6}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext7}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext7}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext8}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext8}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext9}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext9}
        </p>
        <p className="text-2xl mt-5 font-extralight text-black sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56 ">
          {post.titletext10}
        </p>
        <p className="text-xl mt-3 font-extralight font-sans mb-10 text-gray-500 sm:text-left md:text-left lg:text-left lg:mr-56 lg:ml-56">
          {post.posttext10}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    id: post.id,
  }));
}

export default PostDetail;
