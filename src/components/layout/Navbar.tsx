
import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Code, Menu, X, User, LogIn, Github
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    toast({
      title: "Authentication",
      description: "Login functionality will be implemented soon!",
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <BookOpen className="h-6 w-6 text-dsa-navy mr-2" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-dsa-navy">
            DSA Learn
          </span>
        </Link>
        
        <div className="flex items-center md:order-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogin}
            className="hidden md:flex mr-2"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex" 
            onClick={handleLogin}
          >
            <User className="h-4 w-4 mr-2" />
            Register
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        <div className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col p-4 mt-4 bg-white border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link 
                to="/" 
                className="block py-2 pl-3 pr-4 text-dsa-navy hover:text-dsa-teal rounded md:p-0" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/topics" 
                className="block py-2 pl-3 pr-4 text-dsa-navy hover:text-dsa-teal rounded md:p-0" 
                onClick={() => setIsMenuOpen(false)}
              >
                Topics
              </Link>
            </li>
            <li>
              <Link 
                to="/visualizer" 
                className="block py-2 pl-3 pr-4 text-dsa-navy hover:text-dsa-teal rounded md:p-0" 
                onClick={() => setIsMenuOpen(false)}
              >
                Visualizer
              </Link>
            </li>
            <li>
              <Link 
                to="/practice" 
                className="block py-2 pl-3 pr-4 text-dsa-navy hover:text-dsa-teal rounded md:p-0" 
                onClick={() => setIsMenuOpen(false)}
              >
                Practice
              </Link>
            </li>
            <li>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="block py-2 pl-3 pr-4 text-dsa-navy hover:text-dsa-teal rounded md:p-0 flex items-center" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="h-4 w-4 mr-1" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
