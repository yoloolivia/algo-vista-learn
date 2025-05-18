
import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Add dark theme styles
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --background: 271 30% 10%;
        --foreground: 210 40% 98%;
        --card: 272 30% 15%;
        --card-foreground: 210 40% 98%;
        --popover: 272 30% 15%;
        --popover-foreground: 210 40% 98%;
        --primary: 271 60% 50%;
        --primary-foreground: 210 40% 98%;
        --secondary: 271 30% 20%;
        --secondary-foreground: 210 40% 98%;
        --muted: 271 30% 20%;
        --muted-foreground: 215 20% 65%;
        --accent: 271 30% 20%;
        --accent-foreground: 210 40% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;
        --border: 271 30% 25%;
        --input: 271 30% 25%;
        --ring: 271 60% 50%;
      }

      body {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }

      .button-primary {
        background-color: hsl(var(--primary)) !important;
        color: hsl(var(--primary-foreground)) !important;
      }

      .array-item {
        background-color: hsl(var(--primary));
        border-color: hsl(var(--border));
      }

      .array-item.current {
        background-color: #9b87f5;
      }

      .array-item.compared {
        background-color: #7E69AB;
      }

      .array-item.sorted {
        background-color: #6E59A5;
      }

      .array-item.found {
        background-color: #4CAF50;
      }

      .target-indicator {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #ff5722;
      }
    `;
    document.head.appendChild(style);
    
    // Set dark class on html element
    document.documentElement.classList.add('dark');
    
    return () => {
      document.head.removeChild(style);
      document.documentElement.classList.remove('dark');
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
