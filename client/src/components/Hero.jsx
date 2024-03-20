import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className=' bg-hero bg-cover bg-no-repeat  max-w-full h-dvh  relative'>
        <div className='absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <article className='container flex flex-col justify-center text-center '>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
              Discover Your Ideal Living Space with Ease.
            </h1>
            <p className='mt-6 text-lg leading-8 text-white'>
              Unlock a world of housing possibilities. Explore homes tailored to
              your lifestyle and preferences effortlessly.
            </p>
            <div className='mt-10 flex items-center justify-center'>
              <Link
                to='/search'
                className='w-fit border-2 border-white  text-white text-lg py-2 px-4 font-bold capitalize  hover:bg-white hover:text-black'
              >
                find your home
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Hero;
