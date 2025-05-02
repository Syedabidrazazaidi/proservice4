import React, { useState, useEffect } from 'react';
import { Search, Zap, Droplets, Hammer, Star, Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ServiceProvider } from '../lib/supabase';
import worker1 from './worker1.jpg';
import worker2 from './worker2.jpg';
import worker4 from './worker4.jpg';

const backgroundImages = [
  {
    url: worker1,
    description: "Diverse group of skilled Indian professionals"
  },
  {
    url: worker4,
    description: "Tools and equipment"
  },
  {
    url: worker2,
    description: "Community working together"
  }
];

const getServiceIcon = (profession: string) => {
  switch (profession) {
    case "Electrical Services":
      return <Zap className="w-6 h-6" />;
    case "Plumbing":
      return <Droplets className="w-6 h-6" />;
    case "Carpentry":
      return <Hammer className="w-6 h-6" />;
    default:
      return <Wrench className="w-6 h-6" />;
  }
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [workers, setWorkers] = useState<ServiceProvider[]>([]);
  const [professions, setProfessions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const { data, error } = await supabase
          .from('service_providers')
          .select('profession');

        if (error) {
          console.error('Error fetching professions:', error);
          return;
        }

        const uniqueProfessions = Array.from(new Set(data.map(item => item.profession))).sort();
        setProfessions(uniqueProfessions);
      } catch (err) {
        console.error('Error in fetchProfessions:', err);
      }
    };

    fetchProfessions();
  }, []);

  useEffect(() => {
    const searchWorkers = async () => {
      if (!searchTerm && !selectedProfession) {
        setWorkers([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('service_providers')
          .select('*');

        if (searchTerm) {
          query = query.or(
            `full_name.ilike.%${searchTerm}%,` +
            `profession.ilike.%${searchTerm}%,` +
            `specialization.ilike.%${searchTerm}%`
          );
        }

        if (selectedProfession) {
          query = query.eq('profession', selectedProfession);
        }

        const { data, error: searchError } = await query;

        if (searchError) throw searchError;

        setWorkers(data || []);
      } catch (err) {
        console.error('Error searching workers:', err);
        setError('Failed to search service providers');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchWorkers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedProfession]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const matchedSuggestions = professions.filter(
        item => item.toLowerCase().includes(searchLower)
      );
      setSuggestions(matchedSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, professions]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div
    style={{
      backgroundImage: `url("${backgroundImages[currentBgIndex].url}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    }}
  >
  
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 p-8 inline-block mx-auto mt-16">
          <h2 className="text-4xl font-bold text-white mb-4">Find Local Service Providers</h2>
          <p className="text-xl text-white">{backgroundImages[currentBgIndex].description}</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
              searchTerm ? 'text-blue-500' : 'text-white'
            }`} />
            <input
              type="text"
              placeholder="Search by service or specialization..."
              className="w-full pl-10 pr-4 py-3 rounded-full transition-all duration-200 
                bg-transparent border border-white/30 text-white placeholder-white/70
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-black/20 rounded-lg shadow-lg border border-white/30 max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-white/20 transition-colors flex items-center space-x-2 text-white"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search className="w-4 h-4" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {professions.map(profession => (
              <button
                key={profession}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedProfession === profession
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'border border-white/30 text-white hover:bg-white/20 hover:shadow'
                }`}
                onClick={() => setSelectedProfession(selectedProfession === profession ? null : profession)}
              >
                {profession}
              </button>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : workers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workers.map(worker => (
              <div key={worker.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={worker.photo_url || "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?w=800&auto=format&fit=crop&q=60"} 
                    alt={worker.full_name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getServiceIcon(worker.profession)}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{worker.profession}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{worker.full_name}</h3>
                  <p className="text-gray-600 mb-2">{worker.experience_years} years experience</p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Age:</span> {worker.age} years
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Location:</span> {worker.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Phone:</span> {worker.phone}
                  </p>
                  {worker.specialization && (
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium">Specialization:</span> {worker.specialization}
                    </p>
                  )}
                  {worker.availability && (
                    <p className="text-sm text-gray-500 mb-4">
                      <span className="font-medium">Availability:</span> {worker.availability}
                    </p>
                  )}
                  <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
                    Contact Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (searchTerm || selectedProfession) && (
          <div className="text-center py-8 text-white">
            No service providers found. Try a different search term or category.
          </div>
        )}
      </div>
    </div>
  );
}