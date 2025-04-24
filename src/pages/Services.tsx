import React, { useState, useEffect } from 'react';
import { Zap, Droplets, Hammer, PaintBucket, Scissors, Wrench, Truck, Brush } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { ServiceProvider } from '../lib/supabase';
import ProfileModal from '../components/ProfileModal';

const services = [
  {
    id: 1,
    name: "Electrical Services",
    icon: <Zap className="w-12 h-12" />,
    description: "Professional electrical installations, repairs, and maintenance",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Plumbing",
    icon: <Droplets className="w-12 h-12" />,
    description: "Expert plumbing solutions for residential and commercial needs",
    image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Carpentry",
    icon: <Hammer className="w-12 h-12" />,
    description: "Custom woodwork and furniture crafting services",
    image: "https://images.unsplash.com/photo-1613613369023-1f2765c2b8f9?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Painting",
    icon: <PaintBucket className="w-12 h-12" />,
    description: "Interior and exterior painting services",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Landscaping",
    icon: <Scissors className="w-12 h-12" />,
    description: "Professional garden and landscape maintenance",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    name: "Appliance Repair",
    icon: <Wrench className="w-12 h-12" />,
    description: "Expert repair services for all home appliances",
    image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Moving Services",
    icon: <Truck className="w-12 h-12" />,
    description: "Professional moving and relocation services",
    image: "https://images.unsplash.com/photo-1600125693229-a0c898d900be?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Home Cleaning",
    icon: <Brush className="w-12 h-12" />,
    description: "Thorough home cleaning and maintenance services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=60"
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
    case "Painting":
      return <PaintBucket className="w-6 h-6" />;
    case "Landscaping":
      return <Scissors className="w-6 h-6" />;
    case "Appliance Repair":
      return <Wrench className="w-6 h-6" />;
    case "Moving Services":
      return <Truck className="w-6 h-6" />;
    case "Home Cleaning":
      return <Brush className="w-6 h-6" />;
    default:
      return <Wrench className="w-6 h-6" />;
  }
};

export default function Services() {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showWorkers, setShowWorkers] = useState(false);
  const [workers, setWorkers] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);

  const fetchWorkers = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('profession', selectedService || '');

      if (error) throw error;
      setWorkers(data || []);
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError('Failed to load service providers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedService) {
      fetchWorkers();
    }
  }, [selectedService]);

  useEffect(() => {
    if (location.state?.refresh && selectedService) {
      fetchWorkers();
    }
  }, [location.state?.refresh]);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowWorkers(true);
    setLoading(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h1>
      
      {!showWorkers ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(service => (
            <div 
              key={service.id} 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleServiceClick(service.name)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <button 
                    className="mt-4 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg text-center"
                  >
                    View Professionals
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setShowWorkers(false);
              setSelectedService(null);
            }}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Services
          </button>
          
          {loading ? (
            <div className="text-center text-white">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : workers.length === 0 ? (
            <div className="text-center text-white">
              No service providers available for this service yet.
              <br />
              <Link 
                to="/register" 
                className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Register as Service Provider
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workers.map(worker => (
                <div 
                  key={worker.id} 
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedProvider(worker)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={worker.photo_url || "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?w=800&auto=format&fit=crop&q=60"} 
                      alt={worker.full_name}
                      className="w-full h-full object-cover"
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
                      <span className="font-medium">Phone:</span> {worker.phone}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium">Location:</span> {worker.location}
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
                    <button 
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProvider(worker);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Modal */}
      {selectedProvider && (
        <ProfileModal
          provider={selectedProvider}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}