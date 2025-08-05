import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { label: 'Paris, France', value: 'CDG' },
  { label: 'Tokyo, Japan', value: 'NRT' },
  { label: 'New York, USA', value: 'JFK' },
];

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');

  const handleCardClick = (destination: string) => {
    navigate(`/search?destination=${destination}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urls = [
      `https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:${from},to:${to},departure:${departure}TANYT&passengers=adults:1&options=cabinclass:economy&mode=search`,
      `https://www.skyscanner.com/transport/flights/${from}/${to}/${departure.replace(/-/g, '')}/?adults=1&cabinclass=economy`,
      `https://www.momondo.com/flights/${from}/${to}/${departure}`,
      `https://www.delta.com/flight-search/book-a-flight?fromCity=${from}&toCity=${to}&departureDate=${departure}`,
      `https://www.southwest.com/air/booking/select.html?originationAirportCode=${from}&destinationAirportCode=${to}&departureDate=${departure}`,
      `https://www.aa.com/booking/find-flights?tripType=oneway&originAirport=${from}&destinationAirport=${to}&departDate=${departure}`,
      `https://www.flyfrontier.com/booking/results?from=${from}&to=${to}&departureDate=${departure}`,
    ];

    urls.forEach((url) => window.open(url, '_blank'));
  };

  return (
    <div className="bg-[#F5F0DC] text-[#091930] min-h-screen">
      {/* Navbar */}
      <header className="bg-[#091930] text-[#D4B463] flex flex-col md:flex-row justify-between items-center px-8 py-6">
        <div className="text-3xl font-bold">AEROPATH</div>
        <nav className="flex space-x-6 mt-4 md:mt-0 text-white">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#D4B463] text-[#091930] px-4 py-2 rounded-md mt-4 md:mt-0 font-bold"
        >
          Login
        </button>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-4 bg-[#F5F0DC]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the World<br />with Us</h1>
        <p className="text-lg mb-6">Discover new destinations, book flights, and<br />enjoy the journey with Aeropath.</p>
        <a href="#" className="bg-[#D4B463] text-[#091930] py-3 px-6 rounded-lg font-bold inline-block">BOOK NOW</a>
      </section>

      {/* Flight Search */}
      <section className="bg-[#FFF6E5] text-center py-12 px-4">
        <h2 className="text-3xl font-semibold mb-2">Search Flights</h2>
        <p className="mb-6">Find the best flights from top travel providers</p>
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <input
            type="text"
            placeholder="From (e.g. JFK)"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            className="p-2 rounded border w-64"
            required
          />
          <input
            type="text"
            placeholder="To (e.g. LAX)"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            className="p-2 rounded border w-64"
            required
          />
          <input
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="p-2 rounded border w-64"
            required
          />
          <button type="submit" className="bg-[#D4B463] text-[#091930] px-6 py-2 rounded font-bold">
            Search Flights
          </button>
        </form>
      </section>

      {/* Destination Cards (React logic preserved) */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#D4B463] mb-6">Explore Destinations</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {destinations.map((dest) => (
            <div
              key={dest.value}
              onClick={() => handleCardClick(dest.value)}
              className="bg-white text-black p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
            >
              {dest.label}
            </div>
          ))}
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-[#091930] text-white flex flex-col md:flex-row justify-center gap-8 py-16 px-4">
        <div className="bg-white text-[#091930] rounded-lg p-6 w-72 shadow">
          <div className="inline-block bg-[#D4B463] text-[#091930] text-xs font-bold px-4 py-1 rounded-full mb-4">Travel Planning</div>
          <h3 className="text-xl font-semibold mb-2">Our Services</h3>
          <p>We help you design custom itineraries tailored to your interests and budget.</p>
        </div>
        <div className="bg-white text-[#091930] rounded-lg p-6 w-72 shadow">
          <div className="inline-block bg-[#1D5C45] text-white text-xs font-bold px-4 py-1 rounded-full mb-4">GET STARTED</div>
          <h3 className="text-xl font-semibold mb-2">Plan Your Trip</h3>
          <p>Start your journey with confidence and ease.</p>
        </div>
        <div className="bg-[#F3B9A8] text-[#091930] rounded-lg p-6 w-72 shadow">
          <div className="inline-block bg-white text-[#091930] text-xs font-bold px-4 py-1 rounded-full mb-4">Special Offer</div>
          <h3 className="text-xl font-semibold mb-2">Save 20%<br />on all flights!</h3>
          <p>We secure the best deals on flights and accommodations globally.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#091930] text-white text-center py-8 px-4 text-sm">
        <div className="mb-4 space-x-4">
          <a href="#" className="text-[#D4B463]">Privacy Policy</a>
          <a href="#" className="text-[#D4B463]">Terms of Service</a>
          <a href="#" className="text-[#D4B463]">Careers</a>
        </div>
        <div>© 2025 Aeropath · All Rights Reserved</div>
      </footer>

      {/* Login Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-center text-xl font-bold text-[#091930] mb-4">Login to Aeropath</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={() => alert('Logged in!')}
              className="w-full bg-[#D4B463] text-[#091930] py-2 rounded font-bold"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
