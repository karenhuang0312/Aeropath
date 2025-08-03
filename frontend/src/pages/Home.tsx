import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#091930] text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-[#091930] border-b border-[#D4B463]">
        <h1 className="text-3xl font-bold text-[#D4B463]">Aeropath</h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#D4B463] text-[#091930] px-4 py-2 rounded-md hover:opacity-90"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-32 px-4 bg-[#091930]">
        <h2 className="text-5xl font-bold text-white mb-6">Explore The World</h2>
        <p className="text-[#EDEAE0] text-lg mb-8 max-w-xl">
          Book your next adventure with ease. Discover destinations, compare flights, and get the best deals with Aeropath.
        </p>
        <button
          onClick={() => navigate('/search')}
          className="bg-[#D4B463] text-[#091930] px-6 py-3 rounded-full text-lg hover:bg-[#bda253]"
        >
          Search Flights
        </button>
      </header>

      {/* Features Section */}
      <section className="bg-[#FFFFFF] text-[#091930] py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Fast Booking</h3>
            <p>Quick and easy search with real-time flight results.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p>Your data is safe with encrypted checkout.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p>We’re here to help anytime you need us.</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="bg-[#f4f4f4] text-[#091930] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Destinations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/400x250/?paris" alt="Paris" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Paris, France</h3>
                <p className="text-sm text-gray-600">The city of lights awaits with its timeless charm and romance.</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/400x250/?tokyo" alt="Tokyo" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">Tokyo, Japan</h3>
                <p className="text-sm text-gray-600">Experience the perfect blend of tradition and technology.</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://source.unsplash.com/400x250/?new-york" alt="New York" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">New York, USA</h3>
                <p className="text-sm text-gray-600">The city that never sleeps, packed with energy and opportunity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#091930] text-[#EDEAE0] text-center py-6">
        &copy; {new Date().getFullYear()} Aeropath. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
