import React from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { label: 'Paris, France', value: 'CDG' },
  { label: 'Tokyo, Japan', value: 'NRT' },
  { label: 'New York, USA', value: 'JFK' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (destination: string) => {
    navigate(`/search?destination=${destination}`);
  };

  return (
    <div className="min-h-screen bg-[#091930] text-white py-20 px-4">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold mb-6 text-[#D4B463]">Explore Destinations</h1>
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
    </div>
  );
};

export default Home;
