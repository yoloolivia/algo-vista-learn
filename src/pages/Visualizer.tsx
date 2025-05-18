import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';
import { SearchVisualizer } from '@/components/visualizers/SearchVisualizer';
import { toast } from 'sonner';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const Visualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(50);
  const [sortAlgorithm, setSortAlgorithm] = useState<string>('bubble');
  const [searchAlgorithm, setSearchAlgorithm] = useState<'linear' | 'binary' | 'dfs' | 'bfs'>('linear');
  const [targetValue, setTargetValue] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Generate random array
  const generateArray = (size = 20) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setOriginalArray([...newArray]);
    toast.success(`Generated new array with ${size} elements`);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    toast.info(`Starting ${getActiveAlgorithmName()} ${getActiveTabName()}`);
  };

  const handlePause = () => {
    setIsRunning(false);
    toast.info("Paused visualization");
  };

  const handleReset = () => {
    setIsRunning(false);
    setArray([...originalArray]);
    toast.info("Reset array to original order");
  };

  const handleNewArray = () => {
    setIsRunning(false);
    generateArray();
    toast.info("Generated new random array");
  };

  const getActiveTabName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab') || 'sorting';
    return tab === 'sorting' ? 'sort' : 'search';
  };

  const getActiveAlgorithmName = (): string => {
    const activeTab = getActiveTabName();
    
    if (activeTab === 'sort') {
      return getAlgorithmName(sortAlgorithm);
    } else {
      return getSearchAlgorithmName(searchAlgorithm);
    }
  };

  const getAlgorithmName = (algo: string): string => {
    switch (algo) {
      case 'bubble': return 'Bubble';
      case 'selection': return 'Selection';
      case 'insertion': return 'Insertion';
      case 'merge': return 'Merge';
      case 'quick': return 'Quick';
      default: return 'Unknown';
    }
  };
  
  const getSearchAlgorithmName = (algo: 'linear' | 'binary' | 'dfs' | 'bfs'): string => {
    switch (algo) {
      case 'linear': return 'Linear';
      case 'binary': return 'Binary';
      case 'dfs': return 'Depth-First';
      case 'bfs': return 'Breadth-First';
      default: return 'Unknown';
    }
  };

  const handleSortAlgorithmChange = (value: string) => {
    setSortAlgorithm(value);
    setIsRunning(false);
    toast.info(`Switched to ${getAlgorithmName(value)} sort`);
  };
  
  const handleSearchAlgorithmChange = (value: 'linear' | 'binary' | 'dfs' | 'bfs') => {
    setSearchAlgorithm(value);
    setIsRunning(false);
    toast.info(`Switched to ${getSearchAlgorithmName(value)} search`);
  };
  
  const handleSearchComplete = (found: boolean, index: number) => {
    setIsRunning(false);
    if (found) {
      toast.success(`Found target value ${targetValue} at index ${index}`);
    } else {
      toast.error(`Target value ${targetValue} not found in the array`);
    }
  };

  // Algorithm code examples
  const getAlgorithmCode = (algo: string): string => {
    switch (algo) {
      case 'bubble':
        return `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`;
      case 'selection':
        return `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      // Swap elements
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`;
      case 'insertion':
        return `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`;
      case 'merge':
        return `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}`;
      case 'quick':
        return `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`;
      default:
        return '';
    }
  };
  
  const getSearchAlgorithmCode = (algo: 'linear' | 'binary' | 'dfs' | 'bfs'): string => {
    switch (algo) {
      case 'linear':
        return `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index where target is found
    }
  }
  return -1; // Return -1 if target is not found
}`;
      case 'binary':
        return `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Return the index where target is found
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Return -1 if target is not found
}`;
      case 'dfs':
        return `function dfs(root, target) {
  if (!root) return null;
  
  // Check current node
  if (root.value === target) {
    return root;
  }
  
  // Recursively search left subtree
  const left = dfs(root.left, target);
  if (left) return left;
  
  // Recursively search right subtree
  return dfs(root.right, target);
}`;
      case 'bfs':
        return `function bfs(root, target) {
  if (!root) return null;
  
  const queue = [root];
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (current.value === target) {
      return current;
    }
    
    if (current.left) {
      queue.push(current.left);
    }
    
    if (current.right) {
      queue.push(current.right);
    }
  }
  
  return null; // Target not found
}`;
      default:
        return '';
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dsa-navy mb-2">Algorithm Visualizer</h1>
          <p className="text-gray-600">
            Watch algorithms in action with step-by-step visual explanations.
          </p>
        </div>

        <Tabs defaultValue="sorting" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="sorting">Sorting Algorithms</TabsTrigger>
            <TabsTrigger value="searching">Searching Algorithms</TabsTrigger>
            <TabsTrigger value="graph" disabled>Graph Algorithms</TabsTrigger>
            <TabsTrigger value="tree" disabled>Tree Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="sorting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sorting Visualizer</CardTitle>
                <CardDescription>
                  Watch how different sorting algorithms organize elements from random order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      variant={sortAlgorithm === 'bubble' ? 'default' : 'outline'} 
                      onClick={() => handleSortAlgorithmChange('bubble')}
                    >
                      Bubble Sort
                    </Button>
                    <Button 
                      variant={sortAlgorithm === 'selection' ? 'default' : 'outline'} 
                      onClick={() => handleSortAlgorithmChange('selection')}
                    >
                      Selection Sort
                    </Button>
                    <Button 
                      variant={sortAlgorithm === 'insertion' ? 'default' : 'outline'} 
                      onClick={() => handleSortAlgorithmChange('insertion')}
                    >
                      Insertion Sort
                    </Button>
                    <Button 
                      variant={sortAlgorithm === 'merge' ? 'default' : 'outline'} 
                      onClick={() => handleSortAlgorithmChange('merge')}
                    >
                      Merge Sort
                    </Button>
                    <Button 
                      variant={sortAlgorithm === 'quick' ? 'default' : 'outline'} 
                      onClick={() => handleSortAlgorithmChange('quick')}
                    >
                      Quick Sort
                    </Button>
                  </div>
                  
                  <div className="algorithm-container">
                    <SortingVisualizer 
                      array={array} 
                      algorithm={sortAlgorithm}
                      speed={speed}
                      isRunning={isRunning}
                      onSortingComplete={() => setIsRunning(false)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      Animation Speed
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-xs">Slow</span>
                      <Slider 
                        value={[speed]} 
                        min={1} 
                        max={100} 
                        step={1} 
                        onValueChange={(value) => setSpeed(value[0])} 
                        className="flex-1"
                      />
                      <span className="text-xs">Fast</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <h4 className="text-sm font-medium mb-2">Controls</h4>
                    <div className="flex flex-wrap gap-2">
                      {isRunning ? (
                        <Button variant="outline" onClick={handlePause}>
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={handleStart}>
                          <Play className="h-4 w-4 mr-1" />
                          {isRunning ? 'Continue' : 'Start'}
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      <Button variant="outline" onClick={handleNewArray}>
                        <Shuffle className="h-4 w-4 mr-1" />
                        New Array
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <h4 className="text-sm font-semibold mb-2">About {getAlgorithmName(sortAlgorithm)} Sort</h4>
                <div className="bg-muted p-3 rounded-md text-sm w-full">
                  {sortAlgorithm === 'bubble' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n²) - Quadratic time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(1) - Constant space
                      </p>
                      <p>
                        Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed.
                      </p>
                    </>
                  )}
                  {sortAlgorithm === 'selection' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n²) - Quadratic time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(1) - Constant space
                      </p>
                      <p>
                        Selection sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and moves it to the end of the sorted sublist.
                      </p>
                    </>
                  )}
                  {sortAlgorithm === 'insertion' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n²) - Quadratic time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(1) - Constant space
                      </p>
                      <p>
                        Insertion sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the location where that element belongs, and then inserts it there.
                      </p>
                    </>
                  )}
                  {sortAlgorithm === 'merge' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n log n) - Linearithmic time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(n) - Linear space
                      </p>
                      <p>
                        Merge sort is a divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves to produce a sorted output.
                      </p>
                    </>
                  )}
                  {sortAlgorithm === 'quick' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(log n) - Logarithmic space
                      </p>
                      <p>
                        Quick sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element and partitioning the array around the pivot, so elements less than the pivot are before it, and elements greater than the pivot come after it.
                      </p>
                    </>
                  )}
                </div>
                
                <h4 className="text-sm font-semibold mt-4 mb-2">Implementation Example</h4>
                <div className="bg-muted p-3 rounded-md text-sm font-mono w-full overflow-x-auto">
                  <pre>{getAlgorithmCode(sortAlgorithm)}</pre>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="searching" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Searching Visualizer</CardTitle>
                <CardDescription>
                  Visualize different search algorithms in action.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button 
                      variant={searchAlgorithm === 'linear' ? 'default' : 'outline'} 
                      onClick={() => handleSearchAlgorithmChange('linear')}
                    >
                      Linear Search
                    </Button>
                    <Button 
                      variant={searchAlgorithm === 'binary' ? 'default' : 'outline'} 
                      onClick={() => handleSearchAlgorithmChange('binary')}
                    >
                      Binary Search
                    </Button>
                    <Button 
                      variant={searchAlgorithm === 'dfs' ? 'default' : 'outline'} 
                      onClick={() => handleSearchAlgorithmChange('dfs')}
                    >
                      Depth-First Search
                    </Button>
                    <Button 
                      variant={searchAlgorithm === 'bfs' ? 'default' : 'outline'} 
                      onClick={() => handleSearchAlgorithmChange('bfs')}
                    >
                      Breadth-First Search
                    </Button>
                  </div>
                  
                  <div className="algorithm-container">
                    <SearchVisualizer 
                      array={array}
                      algorithm={searchAlgorithm}
                      speed={speed}
                      isRunning={isRunning}
                      target={targetValue}
                      onSearchComplete={handleSearchComplete}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium mb-2">Target Value</h4>
                    <Input 
                      type="number" 
                      value={targetValue}
                      onChange={(e) => setTargetValue(Number(e.target.value))}
                      min={1}
                      max={100}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      Animation Speed
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-xs">Slow</span>
                      <Slider 
                        value={[speed]} 
                        min={1} 
                        max={100} 
                        step={1} 
                        onValueChange={(value) => setSpeed(value[0])} 
                        className="flex-1"
                      />
                      <span className="text-xs">Fast</span>
                    </div>
                  </div>
                  
                  <div className="col-span-1">
                    <h4 className="text-sm font-medium mb-2">Controls</h4>
                    <div className="flex flex-wrap gap-2">
                      {isRunning ? (
                        <Button variant="outline" onClick={handlePause}>
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={handleStart}>
                          <Play className="h-4 w-4 mr-1" />
                          {isRunning ? 'Continue' : 'Start'}
                        </Button>
                      )}
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      <Button variant="outline" onClick={handleNewArray}>
                        <Shuffle className="h-4 w-4 mr-1" />
                        New Array
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <h4 className="text-sm font-semibold mb-2">About {getSearchAlgorithmName(searchAlgorithm)} Search</h4>
                <div className="bg-muted p-3 rounded-md text-sm w-full">
                  {searchAlgorithm === 'linear' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(n) - Linear time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(1) - Constant space
                      </p>
                      <p>
                        Linear search sequentially checks each element in a collection until it finds the target value or reaches the end of the collection. It's simple but inefficient for large data sets.
                      </p>
                    </>
                  )}
                  {searchAlgorithm === 'binary' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(log n) - Logarithmic time
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(1) - Constant space
                      </p>
                      <p>
                        Binary search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element and eliminates half of the remaining elements.
                      </p>
                    </>
                  )}
                  {searchAlgorithm === 'dfs' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(V + E) - Linear in vertices + edges
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(h) - Height of tree/graph
                      </p>
                      <p>
                        Depth-First Search explores as far as possible along each branch before backtracking. It uses a stack (often implemented using recursion) to keep track of nodes to visit.
                      </p>
                    </>
                  )}
                  {searchAlgorithm === 'bfs' && (
                    <>
                      <p className="mb-2">
                        <strong>Time Complexity:</strong> O(V + E) - Linear in vertices + edges
                      </p>
                      <p className="mb-2">
                        <strong>Space Complexity:</strong> O(w) - Width of tree/graph
                      </p>
                      <p>
                        Breadth-First Search explores all neighbor nodes at the present depth before moving to nodes at the next depth level. It uses a queue to keep track of nodes to visit.
                      </p>
                    </>
                  )}
                </div>
                
                <h4 className="text-sm font-semibold mt-4 mb-2">Implementation Example</h4>
                <div className="bg-muted p-3 rounded-md text-sm font-mono w-full overflow-x-auto">
                  <pre>{getSearchAlgorithmCode(searchAlgorithm)}</pre>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Visualizer;
