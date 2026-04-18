"use client"
import React from "react";


import { useState } from "react";
import Footer from "@/components/utils/footer";
import Header from "@/components/utils/header";

const PricingPageHome = () => {
  const [planType, setPlanType] = useState<"monthly" | "yearly">("monthly");
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pricing = {
    monthly: {
      standard: "$0",
      premium: "$5",
    },
    yearly: {
      standard: "$0",
      premium: "$50",
    },
  };

  return (
    <div className="bg-white">
  
    <div className="bg-gray-100 pb-20">
      <Header />
      <h1 className="text-center  md:mt-20 text-3xl md:text-4xl font-sans text-[#444F60]">Simple Pricing</h1>
      <h2 className="text-center mt-2  text-[#7f8ea4] text-lg font-sans">Pick the right plan for you</h2>
    </div>
      {/* Pricing Section */}
      <section className="bg-white h-auto">
        <h2 className="font-sans pt-12 md:pt-24 text-md text-center text-[#7f8ea4]">
          Sign up for FREE. No credit card required.
        </h2>

        <div className="max-w-3xl mx-auto px-4 md:px-0">
          {/* Toggle Buttons */}
          <div className="flex justify-center space-x-4 mt-2 mb-8">
            <button
              className={`py-2 px-6 rounded-full text-lg font-semibold transition-all ${
                planType === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 bg-gray-200"
              }`}
              onClick={() => setPlanType("monthly")}
            >
              Monthly
            </button>
            <button
              className={`py-2 px-6 rounded-full text-lg font-semibold transition-all ${
                planType === "yearly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 bg-gray-200"
              }`}
              onClick={() => setPlanType("yearly")}
            >
              Yearly
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="mx-auto bg-blue-100 p-4 rounded-full mb-3 h-16 w-16"
              >
                <path
                  fill="#7fb9ff"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                ></path>
              </svg>
              <h3 className="text-xl text-gray-500 font-semibold mb-4">
                Standard
              </h3>
              <hr />

              <h5 className="font-sans text-sm mt-4 mb-1 text-left ml-2 text-[#7f8ea4]">
                Up to 5 visuals
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Free templates
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Limited color palettes
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Limited fonts
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-4 text-left ml-2 text-[#7f8ea4]">
                Export to PNG and JPG formats
              </h5>

              <p className="text-3xl text-blue-600 font-bold">
                {pricing[planType].standard}
              </p>
              <p className="font-sans text-gray-600">Free forever</p>

              <button className="mt-4 font-sans p-2 pl-3 pr-4 font-bold bg-white border-2 border-blue-600 text-blue-500 rounded-3xl hover:bg-blue-500 hover:text-white">
                Get started
              </button>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="gem"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="mx-auto bg-blue-100 p-4 rounded-full mb-3 h-16 w-16"
              >
                <path
                  fill="#7fb9ff"
                  d="M464 0H112c-4 0-7.8 2-10 5.4L2 152.6c-2.9 4.4-2.6 10.2.7 14.2l276 340.8c4.8 5.9 13.8 5.9 18.6 0l276-340.8c3.3-4.1 3.6-9.8.7-14.2L474.1 5.4C471.8 2 468.1 0 464 0zm-19.3 48l63.3 96h-68.4l-51.7-96h56.8zm-202.1 0h90.7l51.7 96H191l51.6-96zm-111.3 0h56.8l-51.7 96H68l63.3-96zm-43 144h51.4L208 352 88.3 192zm102.9 0h193.6L288 435.3 191.2 192zM368 352l68.2-160h51.4L368 352z"
                ></path>
              </svg>
              <h3 className="text-xl text-gray-500 font-semibold mb-4">
                Premium
              </h3>
              <hr />

              <h5 className="font-sans text-sm mt-4 mb-1 text-left ml-2 text-[#7f8ea4]">
                Unlimited infographics
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Premium templates
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Premium color palettes
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Create your own custom color palettes
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Premium fonts
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-1 text-left ml-2 text-[#7f8ea4]">
                Export to SVG, PNG and JPG formats
              </h5>
              <h5 className="font-sans text-sm mt-1 mb-4 text-left ml-2 text-[#7f8ea4]">
                High resolution exports
              </h5>

              <p className="text-3xl text-blue-600 font-bold">
                {pricing[planType].premium}
              </p>
              <p className="font-sans text-gray-600">Billed yearly</p>

              <button className="mt-4 font-sans p-2 pl-3 pr-4 font-extrabold bg-blue-500 text-white border-2 border-blue-600 rounded-3xl hover:bg-blue-500 hover:text-white">
                Try for free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-20 bg-gray-100 pb-10">
        <h2 className="text-center mb-8 text-2xl font-sans text-gray-600 font-semibold">
          You have some questions?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 md:px-28">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-xl font-sans text-gray-700 font-medium">
              Is the Standard plan really free?
            </h4>
            <p className="font-sans mt-1 text-gray-500">
              Yes! You can use it without paying a cent. It has a few limitations
              but it is great for beginners.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-xl font-sans text-gray-700 font-medium">
              What forms of payment do you accept?
            </h4>
            <p className="font-sans mt-1 text-gray-500">
              We accept most of the major credit cards, including Visa,
              Mastercard and Amex. We also accept PayPal and Apple Pay.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-xl font-sans text-gray-700 font-medium">
              Can I cancel my subscription?
            </h4>
            <p className="font-sans mt-1 text-gray-500">
              Yes! You can cancel your subscription plan from your account
              settings at any time. You will be able to use the premium features
              until the end of your subscription period. We do not offer refunds.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="text-xl font-sans text-gray-700 font-medium">
              How do I change my plan if I start with free Standard Plan?
            </h4>
            <p className="font-sans mt-1 text-gray-500">
              You can easily upgrade to Premium plan anytime you want from your
              account. Just click Upgrade to Premium button.
            </p>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default PricingPageHome;