
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, Share2, GitBranch, Network, Filter, Search, Hash, 
  TreePine, Clock, CheckCircle2, Star, Code, FileCode, CodeXml
} from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  topicIcon: React.ReactNode;
  estimatedTime: string;
  status?: 'not-started' | 'in-progress' | 'completed';
}

const Practice = () => {
  const exercises: Exercise[] = [
    {
      id: 'array-reverse',
      title: 'Reverse an Array',
      description: 'Write a function to reverse the elements of an array in-place.',
      difficulty: 'easy',
      topic: 'Arrays',
      topicIcon: <Database className="h-5 w-5" />,
      estimatedTime: '15 min'
    },
    {
      id: 'linked-list-cycle',
      title: 'Detect Cycle in Linked List',
      description: 'Implement an algorithm to determine if a linked list has a cycle.',
      difficulty: 'medium',
      topic: 'Linked Lists',
      topicIcon: <Share2 className="h-5 w-5" />,
      estimatedTime: '20 min'
    },
    {
      id: 'stack-parentheses',
      title: 'Valid Parentheses',
      description: 'Check if a string has valid parentheses using a stack.',
      difficulty: 'easy',
      topic: 'Stacks',
      topicIcon: <GitBranch className="h-5 w-5" />,
      estimatedTime: '15 min'
    },
    {
      id: 'binary-search',
      title: 'Implement Binary Search',
      description: 'Write a binary search function for a sorted array.',
      difficulty: 'easy',
      topic: 'Searching',
      topicIcon: <Search className="h-5 w-5" />,
      estimatedTime: '15 min'
    },
    {
      id: 'merge-sort',
      title: 'Implement Merge Sort',
      description: 'Implement the merge sort algorithm for an array.',
      difficulty: 'medium',
      topic: 'Sorting',
      topicIcon: <Filter className="h-5 w-5" />,
      estimatedTime: '25 min'
    },
    {
      id: 'bst-insert',
      title: 'Insert into Binary Search Tree',
      description: 'Implement a function to insert a value into a BST.',
      difficulty: 'medium',
      topic: 'Trees',
      topicIcon: <TreePine className="h-5 w-5" />,
      estimatedTime: '20 min'
    },
    {
      id: 'hashtable-implement',
      title: 'Implement Hash Table',
      description: 'Create a basic hash table with insert, search, and delete operations.',
      difficulty: 'hard',
      topic: 'Hash Tables',
      topicIcon: <Hash className="h-5 w-5" />,
      estimatedTime: '40 min'
    },
    {
      id: 'graph-dfs',
      title: 'Depth-First Search',
      description: 'Implement DFS algorithm for a graph.',
      difficulty: 'hard',
      topic: 'Graphs',
      topicIcon: <Network className="h-5 w-5" />,
      estimatedTime: '30 min'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return (
          <div className="flex">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-gray-300" />
            <Star className="h-4 w-4 text-gray-300" />
          </div>
        );
      case 'medium':
        return (
          <div className="flex">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-gray-300" />
          </div>
        );
      case 'hard':
        return (
          <div className="flex">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dsa-navy mb-2">Practice Exercises</h1>
          <p className="text-gray-600">
            Reinforce your learning with hands-on coding challenges.
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Exercises</TabsTrigger>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises.map(exercise => (
                <Card key={exercise.id} className="hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 p-1.5 rounded-full bg-dsa-teal/10 text-dsa-teal">
                          {exercise.topicIcon}
                        </div>
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className={`${getDifficultyColor(exercise.difficulty)} border-none`}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <span>{exercise.topic}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{exercise.estimatedTime}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{exercise.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        {getDifficultyStars(exercise.difficulty)}
                      </div>
                      {exercise.status === 'completed' && (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex gap-2">
                      <Button variant="default" className="flex-1">
                        <Code className="h-4 w-4 mr-2" />
                        Start Coding
                      </Button>
                      <Button variant="outline">
                        <FileCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="easy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises
                .filter(ex => ex.difficulty === 'easy')
                .map(exercise => (
                  <Card key={exercise.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-full bg-dsa-teal/10 text-dsa-teal">
                            {exercise.topicIcon}
                          </div>
                          <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={`${getDifficultyColor(exercise.difficulty)} border-none`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <span>{exercise.topic}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{exercise.estimatedTime}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          {getDifficultyStars(exercise.difficulty)}
                        </div>
                        {exercise.status === 'completed' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex gap-2">
                        <Button variant="default" className="flex-1">
                          <Code className="h-4 w-4 mr-2" />
                          Start Coding
                        </Button>
                        <Button variant="outline">
                          <FileCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medium" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises
                .filter(ex => ex.difficulty === 'medium')
                .map(exercise => (
                  <Card key={exercise.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-full bg-dsa-teal/10 text-dsa-teal">
                            {exercise.topicIcon}
                          </div>
                          <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={`${getDifficultyColor(exercise.difficulty)} border-none`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <span>{exercise.topic}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{exercise.estimatedTime}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          {getDifficultyStars(exercise.difficulty)}
                        </div>
                        {exercise.status === 'completed' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex gap-2">
                        <Button variant="default" className="flex-1">
                          <Code className="h-4 w-4 mr-2" />
                          Start Coding
                        </Button>
                        <Button variant="outline">
                          <FileCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercises
                .filter(ex => ex.difficulty === 'hard')
                .map(exercise => (
                  <Card key={exercise.id} className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 p-1.5 rounded-full bg-dsa-teal/10 text-dsa-teal">
                            {exercise.topicIcon}
                          </div>
                          <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={`${getDifficultyColor(exercise.difficulty)} border-none`}>
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <span>{exercise.topic}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{exercise.estimatedTime}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          {getDifficultyStars(exercise.difficulty)}
                        </div>
                        {exercise.status === 'completed' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex gap-2">
                        <Button variant="default" className="flex-1">
                          <Code className="h-4 w-4 mr-2" />
                          Start Coding
                        </Button>
                        <Button variant="outline">
                          <FileCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 p-6 bg-dsa-gray/30 rounded-lg">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-dsa-teal/10 mr-4">
              <CodeXml className="h-6 w-6 text-dsa-teal" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Coming Soon</h3>
              <p className="text-gray-600">
                Interactive code editor with real-time feedback and test cases will be available soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Practice;
