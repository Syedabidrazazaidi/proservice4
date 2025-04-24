import React, { useState, useEffect } from 'react';
import { Search, Wrench, Zap, Droplets, Hammer, Star, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

type Worker = {
  id: number;
  name: string;
  profession: string;
  rating: number;
  experience: string;
  image: string;
  icon: React.ReactNode;
  specialization?: string;
  availability?: string;
};

const workers: Worker[] = [
  {
    id: 1,
    name: "John Smith",
    profession: "Electrician",
    rating: 4.8,
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60",
    icon: <Zap className="w-6 h-6" />,
    specialization: "Residential Wiring",
    availability: "Available 24/7"
  },
  {
    id: 2,
    name: "Mike Johnson",
    profession: "Plumber",
    rating: 4.7,
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=800&auto=format&fit=crop&q=60",
    icon: <Droplets className="w-6 h-6" />,
    specialization: "Emergency Repairs",
    availability: "Mon-Sat"
  },
  {
    id: 3,
    name: "David Wilson",
    profession: "Carpenter",
    rating: 4.9,
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1613613369023-1f2765c2b8f9?w=800&auto=format&fit=crop&q=60",
    icon: <Hammer className="w-6 h-6" />,
    specialization: "Custom Furniture",
    availability: "Mon-Fri"
  },
  {
    id: 4,
    name: "Robert Brown",
    profession: "Electrician",
    rating: 4.9,
    experience: "12+ years",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=60",
    icon: <Zap className="w-6 h-6" />,
    specialization: "Commercial Installations",
    availability: "Mon-Sun"
  },
  {
    id: 5,
    name: "Michael Chen",
    profession: "Electrician",
    rating: 4.7,
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1558830039-46e7c1286b4e?w=800&auto=format&fit=crop&q=60",
    icon: <Zap className="w-6 h-6" />,
    specialization: "Solar Panel Installation",
    availability: "Mon-Fri"
  },
  {
    id: 6,
    name: "Sarah Martinez",
    profession: "Electrician",
    rating: 4.6,
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=60",
    icon: <Zap className="w-6 h-6" />,
    specialization: "Smart Home Systems",
    availability: "Flexible Hours"
  },
  {
    id: 7,
    name: "James Wilson",
    profession: "Plumber",
    rating: 4.8,
    experience: "11+ years",
    image: "https://images.unsplash.com/photo-1600698279077-3cfa604d740f?w=800&auto=format&fit=crop&q=60",
    icon: <Droplets className="w-6 h-6" />,
    specialization: "Bathroom Remodeling",
    availability: "Mon-Sat"
  },
  {
    id: 8,
    name: "Lisa Anderson",
    profession: "Carpenter",
    rating: 4.8,
    experience: "9+ years",
    image: "https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=800&auto=format&fit=crop&q=60",
    icon: <Hammer className="w-6 h-6" />,
    specialization: "Kitchen Cabinets",
    availability: "Tue-Sat"
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const professions = Array.from(new Set(workers.map(w => w.profession)));
  const specializations = Array.from(new Set(workers.map(w => w.specialization || '')));

  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const matchedSuggestions = [...professions, ...specializations].filter(
        item => item.toLowerCase().includes(searchLower)
      );
      setSuggestions(matchedSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (worker.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesProfession = !selectedProfession || worker.profession === selectedProfession;
    return matchesSearch && matchesProfession;
  });

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=60")',
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">ProServices</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-blue-200 transition-colors">About Us</a>
              <a href="#login" className="text-white hover:text-blue-200 transition-colors">Login</a>
              <a href="#register" className="text-white hover:text-blue-200 transition-colors">Register</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 inline-block mx-auto">
          <h2 className="text-2xl font-bold text-white">Find Expert Professionals</h2>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
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
              <div className="absolute z-10 w-full mt-1 bg-black/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 max-h-60 overflow-auto">
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
        {(selectedProfession || searchTerm) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkers.map(worker => (
              <div key={worker.id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={worker.image} 
                    alt={worker.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {worker.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{worker.profession}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{worker.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span className="text-gray-700">{worker.rating}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{worker.experience} experience</p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Specialization:</span> {worker.specialization}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Availability:</span> {worker.availability}
                  </p>
                  <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg">
                    Contact Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About ProServices</h3>
              <p className="text-gray-400">Connecting you with trusted professionals for all your service needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>support@proservices.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>1-800-PRO-SERV</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ProServices. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;