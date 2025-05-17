
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-dsa-navy mr-2" />
              <span className="text-xl font-semibold text-dsa-navy">DSA Learn</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Interactive learning platform for data structures and algorithms.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-dsa-navy">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-dsa-navy">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-dsa-navy">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Content
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/topics" className="text-gray-600 hover:text-dsa-teal">
                  Data Structures
                </Link>
              </li>
              <li>
                <Link to="/topics" className="text-gray-600 hover:text-dsa-teal">
                  Algorithms
                </Link>
              </li>
              <li>
                <Link to="/visualizer" className="text-gray-600 hover:text-dsa-teal">
                  Visualizations
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-600 hover:text-dsa-teal">
                  Practice Exercises
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Community
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-dsa-teal">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DSA Learn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
