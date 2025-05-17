
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, BookOpen, Code, Database, FileCode, Filter, GitBranch, 
  BarChart3, Network, Search, Share2, Sparkles
} from 'lucide-react';

const Index = () => {
  const topics = [
    {
      title: "Arrays & Lists",
      description: "Learn about the most fundamental data structures in computing.",
      icon: <Database className="h-6 w-6" />,
      path: "/topics/arrays"
    },
    {
      title: "Linked Lists",
      description: "Explore singly, doubly, and circular linked lists.",
      icon: <Share2 className="h-6 w-6" />,
      path: "/topics/linked-lists"
    },
    {
      title: "Stacks & Queues",
      description: "Discover these essential LIFO and FIFO data structures.",
      icon: <GitBranch className="h-6 w-6" />,
      path: "/topics/stacks-queues"
    },
    {
      title: "Trees & Graphs",
      description: "Master hierarchical and networked data structures.",
      icon: <Network className="h-6 w-6" />,
      path: "/topics/trees-graphs"
    },
    {
      title: "Sorting Algorithms",
      description: "Visualize and understand different sorting techniques.",
      icon: <Filter className="h-6 w-6" />,
      path: "/visualizer/sorting"
    },
    {
      title: "Search Algorithms",
      description: "Learn methods for finding data efficiently.",
      icon: <Search className="h-6 w-6" />,
      path: "/visualizer/search"
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dsa-navy to-dsa-teal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Master Data Structures & Algorithms
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Interactive visualizations and practice exercises to help you understand 
                complex CS concepts and ace technical interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/topics">
                  <Button size="lg" className="bg-white text-dsa-navy hover:bg-gray-100">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/visualizer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Code className="mr-2 h-5 w-5" />
                    Try Visualizer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <pre className="text-sm text-white overflow-x-auto">
                  <code>
{`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found the target!
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half
    } else {
      right = mid - 1; // Target is in the left half
    }
  }
  
  return -1; // Target not found
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dsa-navy mb-4">
              Learning Made Interactive
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visualize complex algorithms, practice with coding exercises, 
              and track your progress with our comprehensive learning platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-dsa-teal/10 rounded-full text-dsa-teal mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Visualizations</h3>
              <p className="text-gray-600">
                See algorithms in action with step-by-step visual explanations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-dsa-teal/10 rounded-full text-dsa-teal mb-4">
                <FileCode className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coding Practice</h3>
              <p className="text-gray-600">
                Reinforce your learning with practical coding exercises and challenges.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-3 bg-dsa-teal/10 rounded-full text-dsa-teal mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed progress insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dsa-navy mb-4">
              Explore Topics
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Start your journey with these fundamental data structures and algorithms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <Link 
                to={topic.path} 
                key={index} 
                className="no-underline text-foreground"
              >
                <Card className="topic-card h-full">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="mr-3 text-dsa-teal">
                        {topic.icon}
                      </div>
                      <CardTitle>{topic.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{topic.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Explore Topic
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/topics">
              <Button variant="outline" size="lg" className="border-dsa-navy text-dsa-navy hover:bg-dsa-navy hover:text-white">
                View All Topics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dsa-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Master DSA?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of students enhancing their CS knowledge and 
            preparing for technical interviews with our interactive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-dsa-navy hover:bg-gray-100">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
