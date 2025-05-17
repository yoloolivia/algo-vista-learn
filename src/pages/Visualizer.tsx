
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { toast } from 'sonner';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const Visualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
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
    toast.info(`Starting ${getAlgorithmName(algorithm)} sort`);
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

  const handleAlgorithmChange = (value: string) => {
    setAlgorithm(value);
    setIsRunning(false);
    toast.info(`Switched to ${getAlgorithmName(value)} sort`);
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
                      variant={algorithm === 'bubble' ? 'default' : 'outline'} 
                      onClick={() => handleAlgorithmChange('bubble')}
                    >
                      Bubble Sort
                    </Button>
                    <Button 
                      variant={algorithm === 'selection' ? 'default' : 'outline'} 
                      onClick={() => handleAlgorithmChange('selection')}
                    >
                      Selection Sort
                    </Button>
                    <Button 
                      variant={algorithm === 'insertion' ? 'default' : 'outline'} 
                      onClick={() => handleAlgorithmChange('insertion')}
                    >
                      Insertion Sort
                    </Button>
                    <Button 
                      variant={algorithm === 'merge' ? 'default' : 'outline'} 
                      onClick={() => handleAlgorithmChange('merge')}
                    >
                      Merge Sort
                    </Button>
                    <Button 
                      variant={algorithm === 'quick' ? 'default' : 'outline'} 
                      onClick={() => handleAlgorithmChange('quick')}
                    >
                      Quick Sort
                    </Button>
                  </div>
                  
                  <div className="algorithm-container">
                    <SortingVisualizer 
                      array={array} 
                      algorithm={algorithm}
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
                <h4 className="text-sm font-semibold mb-2">About {getAlgorithmName(algorithm)} Sort</h4>
                <div className="bg-muted p-3 rounded-md text-sm w-full">
                  {algorithm === 'bubble' && (
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
                  {algorithm === 'selection' && (
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
                  {algorithm === 'insertion' && (
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
                  {algorithm === 'merge' && (
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
                  {algorithm === 'quick' && (
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
                  <pre>{getAlgorithmCode(algorithm)}</pre>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="searching" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Searching Visualizer</CardTitle>
                <CardDescription>
                  Visualize linear and binary search algorithms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center h-64">
                  <ArrayVisualizer array={[...array].sort((a, b) => a - b)} />
                </div>

                <div className="text-center text-gray-600 mt-4">
                  Search functionality coming soon!
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Visualizer;

