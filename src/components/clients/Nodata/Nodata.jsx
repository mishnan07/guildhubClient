import React from 'react';
import Data from '../Icon/Data';

const Nodata = () => {
  return (
    <div>
      <section className="bg-white py-20 font-serif">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="bg-cover bg-center bg-no-repeat h-96" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}></div>
           <div className='text-6xl font-bold my-8"'>
            </div>
            <h1 className="text-6xl font-bold my-8">404</h1>
          </div>
          <div className="text-center">

            <h3 className="text-6xl font-bold">Look like you're lost</h3>
            <p className="text-lg my-4">The page you are looking for is not available!</p>
            <a href="/" className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block hover:bg-green-600 transition duration-300 ease-in-out">Go to Home</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nodata;
