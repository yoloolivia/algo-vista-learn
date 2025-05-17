
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Database, Share2, GitBranch, Network, Filter, Search, Hash, 
  TreePine, Clock, CheckCircle2, AlertTriangle, ListOrdered
} from 'lucide-react';

type TopicType = {
  id: string;
  title: string;
  description: string;
  category: 'data-structure' | 'algorithm';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ReactNode;
  estimatedTime: string;
  completionStatus?: 'not-started' | 'in-progress' | 'completed';
};

const Topics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const topics: TopicType[] = [
    {
      id: 'arrays',
      title: 'Arrays',
      description: 'Learn about static and dynamic arrays, their operations, and time complexity analysis.',
      category: 'data-structure',
      difficulty: 'beginner',
      icon: <Database className="h-6 w-6" />,
      estimatedTime: '45 min',
      completionStatus: 'not-started'
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'Explore singly and doubly linked lists, with insertion, deletion, and traversal operations.',
      category: 'data-structure',
      difficulty: 'beginner',
      icon: <Share2 className="h-6 w-6" />,
      estimatedTime: '60 min',
      completionStatus: 'not-started'
    },
    {
      id: 'stacks',
      title: 'Stacks',
      description: 'Understand the LIFO data structure, its applications, and implementations.',
      category: 'data-structure',
      difficulty: 'beginner',
      icon: <GitBranch className="h-6 w-6" />,
      estimatedTime: '30 min',
      completionStatus: 'not-started'
    },
    {
      id: 'queues',
      title: 'Queues',
      description: 'Learn about FIFO data structures, including priority queues and deques.',
      category: 'data-structure',
      difficulty: 'beginner',
      icon: <GitBranch className="h-6 w-6" />,
      estimatedTime: '30 min',
      completionStatus: 'not-started'
    },
    {
      id: 'hash-tables',
      title: 'Hash Tables',
      description: 'Master hash functions, collision resolution, and hash table implementations.',
      category: 'data-structure',
      difficulty: 'intermediate',
      icon: <Hash className="h-6 w-6" />,
      estimatedTime: '75 min',
      completionStatus: 'not-started'
    },
    {
      id: 'trees',
      title: 'Trees',
      description: 'Explore binary trees, binary search trees, and basic tree operations.',
      category: 'data-structure',
      difficulty: 'intermediate',
      icon: <TreePine className="h-6 w-6" />,
      estimatedTime: '90 min',
      completionStatus: 'not-started'
    },
    {
      id: 'graphs',
      title: 'Graphs',
      description: 'Learn about graph representations and basic graph properties.',
      category: 'data-structure',
      difficulty: 'advanced',
      icon: <Network className="h-6 w-6" />,
      estimatedTime: '120 min',
      completionStatus: 'not-started'
    },
    {
      id: 'sorting-basic',
      title: 'Basic Sorting Algorithms',
      description: 'Learn bubble, selection, and insertion sorts with step-by-step visualizations.',
      category: 'algorithm',
      difficulty: 'beginner',
      icon: <Filter className="h-6 w-6" />,
      estimatedTime: '60 min',
      completionStatus: 'not-started'
    },
    {
      id: 'sorting-advanced',
      title: 'Advanced Sorting',
      description: 'Master divide and conquer algorithms like merge sort and quicksort.',
      category: 'algorithm',
      difficulty: 'intermediate',
      icon: <Filter className="h-6 w-6" />,
      estimatedTime: '90 min',
      completionStatus: 'not-started'
    },
    {
      id: 'searching',
      title: 'Searching Algorithms',
      description: 'Explore linear and binary search techniques with complexity analysis.',
      category: 'algorithm',
      difficulty: 'beginner',
      icon: <Search className="h-6 w-6" />,
      estimatedTime: '45 min',
      completionStatus: 'not-started'
    },
    {
      id: 'graph-traversal',
      title: 'Graph Traversal',
      description: 'Learn depth-first and breadth-first search algorithms for graphs.',
      category: 'algorithm',
      difficulty: 'intermediate',
      icon: <Network className="h-6 w-6" />,
      estimatedTime: '75 min',
      completionStatus: 'not-started'
    },
    {
      id: 'shortest-path',
      title: 'Shortest Path Algorithms',
      description: "Master Dijkstra's and Bellman-Ford algorithms for finding shortest paths.",
      category: 'algorithm',
      difficulty: 'advanced',
      icon: <Network className="h-6 w-6" />,
      estimatedTime: '120 min',
      completionStatus: 'not-started'
    }
  ];

  const getFilteredTopics = (category: string) => {
    return topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          topic.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || topic.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'not-started':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dsa-navy mb-2">Topics</h1>
            <p className="text-gray-600">
              Explore all available data structures and algorithms topics.
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-72">
            <Input
              type="search"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Topics</TabsTrigger>
            <TabsTrigger value="data-structure">Data Structures</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithms</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTopics('all').map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="data-structure" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTopics('data-structure').map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="algorithm" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredTopics('algorithm').map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-dsa-gray/30 p-6 rounded-lg">
          <div className="flex items-start">
            <ListOrdered className="h-6 w-6 text-dsa-teal mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Learning Path Recommendation</h3>
              <p className="text-gray-600 mb-4">
                New to DSA? We recommend following this sequence for the best learning experience:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Start with Arrays and Lists (fundamental storage)</li>
                <li>Learn Stacks and Queues (abstract data types)</li>
                <li>Master Linked Lists (dynamic data structures)</li>
                <li>Explore Hash Tables (efficient lookup)</li>
                <li>Study Trees (hierarchical structures)</li>
                <li>Deep dive into Graphs (network relationships)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

interface TopicCardProps {
  topic: TopicType;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link to={`/topics/${topic.id}`} className="no-underline text-foreground">
      <Card className="h-full hover:shadow-md transition-all">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="mr-3 text-dsa-teal">
                {topic.icon}
              </div>
              <CardTitle>{topic.title}</CardTitle>
            </div>
            <div>
              {topic.completionStatus && (
                <div title={`Status: ${topic.completionStatus.replace('-', ' ')}`}>
                  {getStatusIcon(topic.completionStatus)}
                </div>
              )}
            </div>
          </div>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={`${getDifficultyColor(topic.difficulty)} border-none`}>
              {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {topic.estimatedTime}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Start Learning
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );

  function getStatusIcon(status: string) {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'not-started':
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  }

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
};

export default Topics;
