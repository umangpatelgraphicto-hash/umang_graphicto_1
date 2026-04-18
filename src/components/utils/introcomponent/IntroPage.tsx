"use client";
import Footer from "@/components/utils/footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const IntroPage = () => {
  const router = useRouter();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
  className="relative bg-white flex flex-col w-full"
  style={{
    backgroundImage: "url('/intro/wavy-2-blue.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain", 

  }}
>
    <header className="pb-20 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4 md:px-28 py-4 relative">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Image src="/logo1.png" alt="Logo" width={180} height={100} />
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="md:hidden ml-4 text-gray-700 hover:text-blue-600"
          >
            <Image src="/icon/dropdown.png" alt="Menu" width={20} height={20} />
          </button>
        </div>   

        {isDropdownOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 z-10 p-4">
            <div className="flex justify-between items-center">
              <Image src="/logo/logo.png" alt="Logo" width={100} height={60} />
              <button onClick={() => setDropdownOpen(false)}>
                <Image src="/icon/dropdown.png" alt="Close" width={20} height={20} />
              </button>
            </div>
            <nav className="flex flex-col items-center mt-2">
              <Link href="/templateshome" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Templates
              </Link>
              <Link href="/pricing" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Pricing
              </Link>
              <Link href="/blog" className="block w-full text-gray-700 hover:bg-gray-200 px-2 py-1 text-center">
                Blog
              </Link>
              <div className="flex flex-col mt-2">
                <Link href="/login" className="block w-full text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500 px-4 py-2 mb-2 text-center">
                  Login
                </Link>
                <Link href="/register" className="block w-full text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500 px-4 py-2 text-center">
                  Signup
                </Link>
              </div>
            </nav>
          </div>
        )}

        <nav className="hidden md:flex flex-row items-center space-x-6 mt-4 md:mt-0">
          <Link href="/templateshome" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Templates
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Pricing
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600">
            Blog
          </Link>
          <div className="flex space-x-4">
            <Link href="/login" className="px-6 py-2 text-sm font-extrabold text-blue-500 border border-blue-600 rounded-full hover:bg-blue-300 hover:text-blue-500">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 text-sm font-extrabold text-white bg-blue-600 rounded-full hover:bg-blue-500">
              Signup
            </Link>
          </div>
        </nav>
      </div>
    </header>
   
      <section className="flex flex-col md:flex-row h-screen items-center justify-between px-6 md:px-28 2xl:px-40 2xl:py-10">
      <div className="max-w-lg 2xl:max-w-3xl px-10 mb-6 md:mb-0 2xl:mb-10">
        <h1 className="text-5xl 2xl:text-7xl font-bold font-sans text-[#444F60] leading-tight 2xl:leading-[1.2]">The Ultimate Infographic Maker</h1>
        <p className="mt-4 text-lg 2xl:text-2xl text-[#8E9BAF] 2xl:leading-relaxed">
          Create powerful smart infographics and visuals without any design skills.
        </p>
        <button
          className="mt-6 px-6 py-3 2xl:px-8 2xl:py-4 text-white bg-blue-600 rounded-3xl hover:bg-blue-500 transition-all duration-300 shadow-lg 2xl:text-xl"
          onClick={() => router.push('/register')}
        >
          Get Started
        </button>
      </div>
      <div className="flex justify-center 2xl:w-[60%]">
        <Image
          src="/intro/introi1.png"
          alt="Main illustration"
          width={700}
          height={550}
          className="rounded-lg shadow-md shadow-gray-400  2xl:w-full 2xl:h-auto"
        />
      </div>
    </section>




<section className="bg-[#FBFBFB] py-22">
  <div className="container mx-auto my-44 flex flex-col md:flex-row items-center justify-between px-6 md:px-28">
    <div className="flex justify-center items-center max-w-lg relative order-2 md:order-1">
      <div className="absolute top-[-10%] left-[-15%] transform rotate-[45deg] w-[70%] h-[70%] bg-[#7fb9ff] rounded-lg opacity-80 z-0"></div>
      <video
        src="/intro/dynamic-itemsv1.mp4"
        autoPlay
        loop
        muted
        className="rounded-lg shadow-lg w-full  max-w-md relative z-10"
      ></video>
    </div>

    <div className="max-w-lg px-10 py-20 order-1 md:order-0">
      <h2 className="text-4xl font-bold font-sans text-[#444F60] mb-4">Smart visuals</h2>
      <div className="h-2 w-24 mb-2 bg-blue-500 rounded-3xl"></div>
      <p className="text-md font-sans text-[#8E9BAF] leading-relaxed">
        Bye-bye dumb shapes.. In Graficto, your visuals dynamically change as you add, edit, remove items or change text and icons. You just have to focus on the content, Graficto will do the design.
      </p>
    </div>
  </div>

  <div className="container mx-auto my-44 flex flex-col md:flex-row items-center justify-between px-6 md:px-28">
    <div className="max-w-lg px-10 py-20 order-1 md:order-0">
      <h2 className="text-4xl font-bold font-sans text-[#444F60] mb-4">Make ideas easy to understand</h2>
      <div className="h-2 w-24 mb-2 bg-blue-500 rounded-3xl"></div>
      <p className="text-md font-sans text-[#8E9BAF] leading-relaxed">
        Be it lists, processes, cycles or even charts, we have got you covered with hundreds of different templates that you can start with.
      </p>
    </div>

    <div className="flex justify-center items-center max-w-lg relative order-2 md:order-1">
      <video
        src="/intro/process-cyclesv2.mp4"
        autoPlay
        loop
        muted
        className="rounded-lg shadow-lg relative md:h-[200px] md:w-[900px] z-10"
      ></video>
    </div>
  </div>

  <div className="container mx-auto my-44 flex flex-col md:flex-row items-center justify-between px-6 md:px-28">
    <div className="flex justify-center items-center max-w-lg relative order-2 md:order-1">
      <video
        src="/intro/color-palettesv3.mp4"
        autoPlay
        loop
        muted
        className="rounded-lg shadow-lg w-full max-w-md relative z-10"
      ></video>
    </div>

    <div className="max-w-lg px-10 py-20 order-1 md:order-0">
      <h2 className="text-4xl font-bold font-sans text-[#444F60] mb-4">Customize with ease</h2>
      <div className="h-2 w-24 mb-2 bg-blue-500 rounded-3xl"></div>
      <p className="text-md font-sans text-[#8E9BAF] leading-relaxed">
        Not happy with the default colors and font? No problem, we have a ton of carefully selected color palettes and fonts to choose from. It just takes one click to apply one.
      </p>
    </div>
  </div>

  <div className="container mx-auto my-44 flex flex-col md:flex-row items-center justify-between px-6 md:px-28">
    <div className="max-w-lg px-10 py-20 order-1 md:order-0">
      <h2 className="text-4xl font-bold font-sans text-[#444F60] mb-4">Designs for any medium</h2>
      <div className="h-2 w-24 mb-2 bg-blue-500 rounded-3xl"></div>
      <p className="text-md font-sans text-[#8E9BAF] leading-relaxed">
        High resolution visuals for your website, blog, design project or print publication. And, yes we support vector format too.
      </p>
    </div>

    <div className="flex justify-center items-center max-w-lg relative order-2 md:order-1">
      <div className="absolute top-[5%] left-[5%] transform rotate-[45deg] w-[70%] h-[70%] bg-[#7fb9ff] rounded-lg opacity-[0.7] z-[0]"></div>
      <Image
        src="/intro/introi2.png"
        alt=""
        width={800}
        height={550}
        className="rounded-lg shadow-lg w-full max-w-md relative z-[10]"
      />
    </div>

  
    <div className="absolute mt-[300px] left-[26%] h-[80px] w-[80px] bg-[#f13ca3] rounded-[12px] opacity-[0.5] rotate-[36deg] z-[20]" />
    <div className="absolute mt-[500px] right-[25%] h-[40px] w-[40px] bg-[#7fb9ff] rounded-[20px] opacity-[0.7] rotate-[24deg] z-[20]" />
  </div>
</section>

<section className="bg-white py-22">
  <div>
    <h1 className="text-5xl font-medium font-sans mt-10 mb-4 text-[#444F60] text-center">
      Templates for Any Idea
    </h1>
    <h2 className="text-xl text-center font-sans text-[#8E9BAF] leading-relaxed">
      Hundreds of professionally designed infographic templates for any occasion.
    </h2>
  </div>

 
  <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-4 p-4">
    <Image
      src="/templates/fg1.png"
      alt="Image 1"
      width={500}
      height={320}
      className="pt-6 pl-4 object-cover"
    />

    <Image
      src="/templates/fg2.png"
      alt="Image 2"
      width={500}
      height={320}
      className="pt-6 pl-4 object-cover"
    />

    <Image
      src="/templates/fg1.png"
      alt="Image 3"
      width={500}
      height={320}
      className="pt-6 pl-4 object-cover"
    />

    <Image
      src="/templates/fg2.png"
      alt="Image 4"
      width={500}
      height={320}
      className="pt-6 pl-4 object-cover"
    />

    <Image
      src="/templates/fg2.png"
      alt="Image 5"
      width={500}
      height={320}
      className="pt-6 pl-4 mb-4 object-cover"
    />

    <Image
      src="/templates/fg1.png"
      alt="Image 6"
      width={500}
      height={320}
      className="pt-6 pl-4 mb-4 object-cover"
    />

    <Image
      src="/templates/fg2.png"
      alt="Image 7"
      width={500}
      height={320}
      className="pt-6 pl-4 mb-4 object-cover"
    />

    <Image
      src="/templates/fg1.png"
      alt="Image 8"
      width={500}
      height={320}
      className="pt-6 pl-4 mb-4 object-cover"
    />
  </div>

  {/* Responsive Button */}
  <div className="flex justify-center mt-10 mb-10">
    <button className="text-white bg-blue-500 rounded-3xl p-3">
      Explore More Templates
    </button>
  </div>
</section>

<section className="bg-[#FBFBFB] py-22">
  <div>
    <h1 className="text-5xl font-medium font-sans mt-10 mb-4 text-[#444F60] text-center">
      Our Users Love Graficto
    </h1>
    <h2 className="text-xl text-center font-sans mb-4 text-[#8E9BAF] leading-relaxed">
      Users find it surprisingly easy to create stunning infographics with
      Grafico
    </h2>
  </div>

  <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 pl-10 pr-10 gap-6 p-4">
    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          Anyone who wants to have good infographics but does not possess
          the visual eyes and need it fast will find great help from
          Graficto!! It&apos;s so easy to use!
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Jeremy Woods
        </p>
      </div>
    </div>

    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          From charts, graphs, and workflows for company documentation, to
          a quick graphic made during a meeting to provide a visual
          thought, Graficto is a great time saver!
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Eric Dryden
        </p>
      </div>
    </div>

    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          You can use it right away. I was able to immediately apply the
          infographic to the PPT I was presenting next week!
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Gun Hong
        </p>
      </div>
    </div>

    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          A top-notch infographics maker 🏆 with professional quality
          designs and highly customizable templates!
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Anton Paul
        </p>
      </div>
    </div>

    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          Making infographics with Graficto is so easy, you can&apos;t
          stop using them. It made me realise it&apos;s much easier to
          explain many things via an infographics.
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Robbie Faulkner
        </p>
      </div>
    </div>

    <div className="p-4 border rounded shadow-lg flex">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center mb-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="quote-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-4 text-blue-500 svg-inline--fa fa-quote-left fa-w-16 fa-lg"
          >
            <path
              fill="currentColor"
              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              className=""
            ></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          Pumping out some infographics in seconds rather than minutes is
          a lovely experience! No hassle, no distractions, bish bash bosh.
        </p>
        <p className="ml-2 text-xl font-semibold text-blue-500">
          Mike Lewis
        </p>
      </div>
    </div>
  </div>
</section>

      <Footer></Footer>
    </div>
  );
};

export default IntroPage;
