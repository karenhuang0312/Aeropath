import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Flight = {
  id: string;
  origin: string;
  destination: string;
  date: string;
  airline: string;
  price: number;
  link: string;
};

const mockFlights: Flight[] = [
  {
    id: "1",
    origin: "JFK",
    destination: "CDG",
    date: "2025-09-01",
    airline: "Air France",
    price: 890,
    link: "https://www.airfrance.com/",
  },
  {
    id: "2",
    origin: "JFK",
    destination: "CDG",
    date: "2025-09-01",
    airline: "Delta",
    price: 950,
    link: "https://www.delta.com/",
  },
  // ...more
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<Flight[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<"price" | "airline">("price");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResults(
        mockFlights
          .filter(f =>
            (!origin || f.origin === origin) &&
            (!destination || f.destination === destination) &&
            (!date || f.date === date)
          )
          .sort((a, b) => sort === "price"
            ? a.price - b.price
            : a.airline.localeCompare(b.airline)
          )
      );
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Flight Search</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Origin (e.g., JFK)" value={origin} onChange={e => setOrigin(e.target.value)} />
              <Input placeholder="Destination (e.g., CDG)" value={destination} onChange={e => setDestination(e.target.value)} />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Searching..." : "Search"}</Button>
            </form>
          </CardContent>
        </Card>
        {results !== null && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              <div>
                <label className="mr-2">Sort by:</label>
                <select value={sort} onChange={e => setSort(e.target.value as any)} className="border rounded px-2 py-1">
                  <option value="price">Price</option>
                  <option value="airline">Airline</option>
                </select>
              </div>
            </div>
            {results.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">No flights found. Try adjusting your search.</div>
            ) : (
              <div className="grid gap-4">
                {results.map(f => (
                  <Card key={f.id}>
                    <CardHeader>
                      <CardTitle>{f.origin} → {f.destination} ({f.airline})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">${f.price}</span>
                        <a href={f.link} target="_blank" rel="noopener noreferrer">
                          <Button>Go to Airline</Button>
                        </a>
                      </div>
                      <div className="text-gray-500 text-sm mt-2">Date: {f.date}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
