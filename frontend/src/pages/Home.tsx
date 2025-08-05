import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const airlineLinks = {
  delta: 'https://www.delta.com/',
  spirit: 'https://www.spirit.com/',
  united: 'https://www.united.com/',
  southwest: 'https://www.southwest.com/',
  american: 'https://www.aa.com/',
};

const destinations = [
  { label: 'Paris, France', value: 'paris' },
  { label: 'Tokyo, Japan', value: 'tokyo' },
  { label: 'New York, USA', value: 'new-york' },
];

const airlines = [
  { label: 'Delta Airlines', value: 'delta' },
  { label: 'Spirit Airlines', value: 'spirit' },
  { label: 'United Airlines', value: 'united' },
  { label: 'Southwest Airlines', value: 'southwest' },
  { label: 'American Airlines', value: 'american' },
];

const Search = () => {
  const [destination, setDestination] = useState('');
  const [airline, setAirline] = useState('');

  const handleSearch = () => {
    if (!destination || !airline) return alert('Please select both destination and airline.');

    const airlineURL = airlineLinks[airline];
    if (airlineURL) {
      window.open(airlineURL, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#091930] text-white py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#D4B463]">Search Flights</h1>

        <div className="mb-4 text-left">
          <label className="block mb-2">Select Destination</label>
          <select
            className="w-full p-3 rounded-md text-black"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">-- Choose a destination --</option>
            {destinations.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 text-left">
          <label className="block mb-2">Select Airline</label>
          <select
            className="w-full p-3 rounded-md text-black"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          >
            <option value="">-- Choose an airline --</option>
            {airlines.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#D4B463] text-[#091930] px-6 py-3 rounded-full text-lg hover:bg-[#bda253]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Search;
