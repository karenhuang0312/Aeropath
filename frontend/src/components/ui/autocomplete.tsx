import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

type Location = {
  id: string;
  name: string;
  code: string;
  country: string;
};

type Props = {
  onSelect: (code: string) => void;
  value: string;
  setValue: (val: string) => void;
};

const Autocomplete: React.FC<Props> = ({ onSelect, value, setValue }) => {
  const [results, setResults] = useState<Location[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/locations?term=${value}`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleSelect = (loc: Location) => {
    onSelect(loc.code);
    setValue(loc.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <Input
        placeholder="Destination (type city)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && results.length > 0 && (
        <div className="absolute z-10 bg-white text-black border w-full rounded shadow mt-1 max-h-60 overflow-y-auto">
          {results.map((loc) => (
            <div
              key={loc.id}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(loc)}
            >
              {loc.name} ({loc.code}) - {loc.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
