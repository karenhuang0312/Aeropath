import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const airlineLinks: Record<string, string> = {
  delta: 'https://www.delta.com/',
  spirit: 'https://www.spirit.com/',
  united: 'https://www.united.com/',
  southwest: 'https://www.southwest.com/',
  american: 'https://www.aa.com/',
};

const destinations = [
  { label: 'Paris, France', value: 'CDG' },
  { label: 'Tokyo, Japan', value: 'NRT' },
  { label: 'New York, USA', value: 'JFK' },
];

const airlines = [
  { label: 'Delta Airlines', value: 'delta' },
  { label: 'Spirit Airlines', value: 'spirit' },
  { label: 'United Airlines', value: 'united' },
  { label: 'Southwest Airlines', value: 'southwest' },
  { label: 'American Airlines', value: 'american' },
];

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const preselectedDestination = queryParams.get('destination') || '';

  const [destination, setDestination] = useState(preselectedDestination);
  const [airline, setAirline] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!destination || !airline || !date) {
      return alert('Please select a destination, airline, and date.');
    }

    setLoading(true);

    try {
      // Optional: Save search if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(
          '/api/search',
          { origin: 'JFK', destination, date },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Call flight API
      const res = await axios.get('/api/flights', {
        params: {
          origin: 'JFK',
          destination,
          date,
          sort: 'price',
        },
      });

      setFlights(res.data || []);
    } catch (err) {
      console.error('Error fetching flights:', err);
      alert('Something went wrong fetching flights.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!airline) return alert('Please select an airline to book.');
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

        <div className="mb-4 text-left">
          <label className="block mb-2">Select Date</label>
          <input
            type="date"
            className="w-full p-3 rounded-md text-black"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleSearch}
            className="bg-[#D4B463] text-[#091930] px-6 py-3 rounded-full text-lg hover:bg-[#bda253]"
          >
            {loading ? 'Searching...' : 'Search Flights'}
          </button>

          <button
            onClick={handleBook}
            className="bg-white text-[#091930] px-6 py-3 rounded-full text-lg hover:bg-gray-200"
          >
            Book Airline
          </button>
        </div>

        {/* Results */}
        {flights.length > 0 && (
          <div className="mt-10 text-left">
            <h2 className="text-2xl font-bold mb-4">Results:</h2>
            <ul className="space-y-4">
              {flights.map((flight: any) => (
                <li key={flight.id} className="bg-white text-black p-4 rounded-md shadow">
                  <p>
                    <strong>{flight.origin} → {flight.destination}</strong>
                  </p>
                  <p>Date: {flight.date}</p>
                  <p>Airline: {flight.airline}</p>
                  <p>Price: ${flight.price}</p>
                  <a
                    href={flight.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 inline-block"
                  >
                    View Deal
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
