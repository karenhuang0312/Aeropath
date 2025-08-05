import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Autocomplete from "@/components/Autocomplete";

type Flight = {
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  price: number;
};

const Search = () => {
  const [params] = useSearchParams();
  const [origin, setOrigin] = useState("JFK");
  const [destination, setDestination] = useState(params.get("destination") || "");
  const [destinationInput, setDestinationInput] = useState("");
  const [date, setDate] = useState("2025-09-01");
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!origin || !destination || !date) return;

    const fetchFlights = async () => {
      const res = await fetch(`/api/flights?origin=${origin}&destination=${destination}&date=${date}`);
      const data = await res.json();
      setFlights(data);
    };

    fetchFlights();
  }, [origin, destination, date]);

  return (
    <div className="min-h-screen bg-[#091930] text-white py-20 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#D4B463]">Search Flights</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-1">Origin Airport Code</label>
            <input
              className="w-full p-2 rounded text-black"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Destination</label>
            <Autocomplete value={destinationInput} setValue={setDestinationInput} onSelect={setDestination} />
          </div>

          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 rounded text-black"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {flights.map((f, i) => (
            <div key={i} className="bg-white text-black p-4 rounded shadow">
              <div className="font-bold">{f.airline} #{f.flight_number}</div>
              <div>{f.origin} → {f.destination}</div>
              <div>Departure: {f.departure}</div>
              <div>Arrival: {f.arrival}</div>
              <div className="font-semibold mt-2">${f.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
