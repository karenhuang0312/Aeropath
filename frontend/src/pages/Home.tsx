import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, MessageSquare, Zap } from 'lucide-react';

const popularDestinations = [
  { city: "Paris", code: "CDG", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { city: "New York", code: "JFK", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" },
  { city: "Tokyo", code: "HND", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80" },
  { city: "London", code: "LHR", image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80" },
  { city: "Barcelona", code: "BCN", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
  { city: "Sydney", code: "SYD", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a0b16?auto=format&fit=crop&w=600&q=80" },
];

const Home = () => {
  const navigate = useNavigate();
  const handleDestinationClick = (dest: typeof popularDestinations[0]) => {
    navigate(`/search?destination=${dest.code}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header and Hero omitted for brevity; keep your existing code */}
      
      {/* Popular Destinations */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {popularDestinations.map(dest => (
            <Card key={dest.code} className="cursor-pointer group" onClick={() => handleDestinationClick(dest)}>
              <img src={dest.image} alt={dest.city} className="rounded-t-lg h-40 w-full object-cover" />
              <CardHeader>
                <CardTitle>{dest.city}</CardTitle>
                <CardDescription>{dest.code}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
