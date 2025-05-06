import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Wrench, Facebook, Twitter, Instagram, Mail, Phone, Menu, X } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getNavLinkClass = (path: string) => {
    return `transition-colors relative ${
      isActivePath(path)
        ? 'text-blue-500 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-blue-500'
        : 'text-white hover:text-blue-200'
    }`;
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1582883693742-5d25fbef2c85?w=1600&auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header>
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">ProWorker</h1>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/" className={getNavLinkClass('/')}>Home</Link>
                <Link to="/services" className={getNavLinkClass('/services')}>Services</Link>
                <Link to="/register" className={getNavLinkClass('/register')}>Register</Link>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden mt-4 pb-4">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className={getNavLinkClass('/')} onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link to="/services" className={getNavLinkClass('/services')} onClick={() => setIsMenuOpen(false)}>Services</Link>
                  <Link to="/register" className={getNavLinkClass('/register')} onClick={() => setIsMenuOpen(false)}>Register</Link>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/95 backdrop-blur-sm text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About ProServices</h3>
                <p className="text-gray-400">Connecting you with trusted professionals for all your service needs.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Help</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Support Center</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
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
    </div>
  );
}