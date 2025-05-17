
import React, { useState, useEffect } from 'react';

interface SortingVisualizerProps {
  array: number[];
  algorithm: string;
  speed: number;
  isRunning: boolean;
  onSortingComplete: () => void;
}

interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'sorted';
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  array,
  algorithm,
  speed,
  isRunning,
  onSortingComplete
}) => {
  const [visualArray, setVisualArray] = useState<ArrayElement[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationTimeouts, setAnimationTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Reset visualArray when array changes
  useEffect(() => {
    setVisualArray(array.map(value => ({ value, state: 'default' })));
    clearAnimations();
    setCurrentStep(0);
    setTotalSteps(0);
    setCurrentDescription("");
    setIsPaused(false);
  }, [array]);
  
  // Handle running/pausing
  useEffect(() => {
    if (isRunning && !isSorting && !isPaused) {
      startSorting();
    } else if (isRunning && isPaused) {
      // Continue from current step
      continueSorting();
    } else if (!isRunning && isSorting) {
      pauseSorting();
    }
  }, [isRunning]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAnimations();
    };
  }, []);

  const clearAnimations = () => {
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    setAnimationTimeouts([]);
    setIsSorting(false);
  };

  const continueSorting = () => {
    setIsPaused(false);
    startSorting(currentStep);
  };
  
  const startSorting = (startFromStep = 0) => {
    clearAnimations();
    setIsSorting(true);
    
    // Clone array for animations
    const animations: { 
      compare?: [number, number], 
      swap?: [number, number], 
      sorted?: number[],
      description?: string
    }[] = [];
    const arrayCopy = [...array];
    
    // Generate animations based on algorithm
    if (algorithm === 'bubble') {
      bubbleSort(arrayCopy, animations);
    } else if (algorithm === 'selection') {
      selectionSort(arrayCopy, animations);
    } else if (algorithm === 'insertion') {
      insertionSort(arrayCopy, animations);
    } else if (algorithm === 'merge') {
      const aux = [...arrayCopy];
      mergeSort(arrayCopy, 0, arrayCopy.length - 1, aux, animations);
    } else if (algorithm === 'quick') {
      quickSort(arrayCopy, 0, arrayCopy.length - 1, animations);
    }

    // Set total steps
    if (startFromStep === 0) {
      setTotalSteps(animations.length);
    }
    
    // Process animations with delays
    const newTimeouts: NodeJS.Timeout[] = [];
    const animationSpeed = 1000 - speed * 9; // Convert speed (1-100) to delay (100-1000ms)
    
    // Start from the current step if we're continuing
    animations.slice(startFromStep).forEach((animation, index) => {
      const actualStepIndex = startFromStep + index;
      
      const timeout = setTimeout(() => {
        const newVisualArray = [...visualArray];
        
        // Reset previous comparison states
        newVisualArray.forEach(el => {
          if (el.state === 'comparing') {
            el.state = 'default';
          }
        });
        
        // Apply animation
        if (animation.compare) {
          const [i, j] = animation.compare;
          newVisualArray[i].state = 'comparing';
          newVisualArray[j].state = 'comparing';
        }
        
        if (animation.swap) {
          const [i, j] = animation.swap;
          const temp = newVisualArray[i].value;
          newVisualArray[i].value = newVisualArray[j].value;
          newVisualArray[j].value = temp;
        }
        
        if (animation.sorted) {
          animation.sorted.forEach(i => {
            newVisualArray[i].state = 'sorted';
          });
        }
        
        setVisualArray([...newVisualArray]);
        setCurrentStep(actualStepIndex + 1);
        
        if (animation.description) {
          setCurrentDescription(animation.description);
        }
        
        // Check if it's the last animation
        if (actualStepIndex === animations.length - 1) {
          // Mark all as sorted at the end
          setTimeout(() => {
            setVisualArray(prev => prev.map(el => ({ ...el, state: 'sorted' })));
            setIsSorting(false);
            setCurrentDescription("Sorting complete!");
            onSortingComplete();
          }, animationSpeed);
        }
      }, index * animationSpeed);
      
      newTimeouts.push(timeout);
    });
    
    setAnimationTimeouts(newTimeouts);
  };
  
  const pauseSorting = () => {
    clearAnimations();
    setIsPaused(true);
  };
  
  // Sorting algorithms with animation recording
  const bubbleSort = (arr: number[], animations: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ 
          compare: [j, j+1],
          description: `Comparing elements at positions ${j} and ${j+1}`
        });
        
        if (arr[j] > arr[j+1]) {
          animations.push({ 
            swap: [j, j+1],
            description: `Swapping ${arr[j]} and ${arr[j+1]}`
          });
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        }
      }
      animations.push({ 
        sorted: [arr.length - i - 1],
        description: `Element ${arr[arr.length - i - 1]} is now in its sorted position`
      });
    }
  };
  
  const selectionSort = (arr: number[], animations: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      
      animations.push({
        description: `Looking for the smallest element starting from position ${i}`
      });
      
      for (let j = i + 1; j < arr.length; j++) {
        animations.push({ 
          compare: [minIdx, j],
          description: `Comparing current minimum (${arr[minIdx]}) with element at position ${j} (${arr[j]})`
        });
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          animations.push({
            description: `Found new minimum: ${arr[j]} at position ${j}`
          });
        }
      }
      
      if (minIdx !== i) {
        animations.push({ 
          swap: [i, minIdx],
          description: `Swapping ${arr[i]} with the found minimum ${arr[minIdx]}`
        });
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      
      animations.push({ 
        sorted: [i],
        description: `Element ${arr[i]} is now in its sorted position`
      });
    }
  };
  
  const insertionSort = (arr: number[], animations: any[]) => {
    for (let i = 1; i < arr.length; i++) {
      animations.push({
        description: `Inserting element ${arr[i]} into the sorted portion`
      });
      
      let j = i;
      
      while (j > 0) {
        animations.push({ 
          compare: [j, j-1],
          description: `Comparing ${arr[j]} with ${arr[j-1]}`
        });
        
        if (arr[j] < arr[j-1]) {
          animations.push({ 
            swap: [j, j-1],
            description: `Moving ${arr[j-1]} right to insert ${arr[j]}`
          });
          [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
          j--;
        } else {
          animations.push({
            description: `${arr[j]} is in correct position relative to ${arr[j-1]}`
          });
          break;
        }
      }
      
      animations.push({ 
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        description: `First ${i+1} elements are now sorted`
      });
    }
  };
  
  const mergeSort = (arr: number[], low: number, high: number, aux: number[], animations: any[]) => {
    if (low >= high) return;
    
    const mid = Math.floor((low + high) / 2);
    
    animations.push({
      description: `Splitting array into two parts: [${low}...${mid}] and [${mid+1}...${high}]`
    });
    
    mergeSort(arr, low, mid, aux, animations);
    mergeSort(arr, mid + 1, high, aux, animations);
    
    animations.push({
      description: `Merging subarrays [${low}...${mid}] and [${mid+1}...${high}]`
    });
    
    merge(arr, low, mid, high, aux, animations);
  };
  
  const merge = (arr: number[], low: number, mid: number, high: number, aux: number[], animations: any[]) => {
    for (let k = low; k <= high; k++) {
      aux[k] = arr[k];
    }
    
    let i = low;
    let j = mid + 1;
    
    for (let k = low; k <= high; k++) {
      if (i > mid) {
        animations.push({ 
          compare: [k, j],
          description: `Left subarray is exhausted, taking ${aux[j]} from right subarray`
        });
        arr[k] = aux[j++];
      } else if (j > high) {
        animations.push({ 
          compare: [k, i],
          description: `Right subarray is exhausted, taking ${aux[i]} from left subarray`
        });
        arr[k] = aux[i++];
      } else if (aux[i] <= aux[j]) {
        animations.push({ 
          compare: [i, j],
          description: `${aux[i]} ≤ ${aux[j]}, taking ${aux[i]} from left subarray`
        });
        arr[k] = aux[i++];
      } else {
        animations.push({ 
          compare: [i, j],
          description: `${aux[i]} > ${aux[j]}, taking ${aux[j]} from right subarray`
        });
        arr[k] = aux[j++];
      }
    }
    
    // Mark the entire subarray as sorted
    animations.push({ 
      sorted: Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
      description: `Subarray [${low}...${high}] is now sorted`
    });
  };
  
  const quickSort = (arr: number[], low: number, high: number, animations: any[]) => {
    if (low < high) {
      animations.push({
        description: `Partitioning subarray with pivot ${arr[high]}`
      });
      
      const pivotIndex = partition(arr, low, high, animations);
      animations.push({ 
        sorted: [pivotIndex],
        description: `Pivot ${arr[pivotIndex]} is now in its final position`
      });
      
      quickSort(arr, low, pivotIndex - 1, animations);
      quickSort(arr, pivotIndex + 1, high, animations);
    } else if (low === high) {
      animations.push({ 
        sorted: [low],
        description: `Single element ${arr[low]} is already sorted`
      });
    }
  };
  
  const partition = (arr: number[], low: number, high: number, animations: any[]): number => {
    const pivot = arr[high];
    animations.push({
      description: `Using ${pivot} as pivot`
    });
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      animations.push({ 
        compare: [j, high],
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      });
      
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          animations.push({ 
            swap: [i, j],
            description: `${arr[j]} ≤ ${pivot}, swapping to left side of partition`
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        } else {
          animations.push({
            description: `${arr[j]} ≤ ${pivot}, already in correct position`
          });
        }
      }
    }
    
    animations.push({ 
      swap: [i + 1, high],
      description: `Placing pivot ${pivot} in its correct position`
    });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
  };
  
  // Calculate bar heights based on array values
  const maxValue = Math.max(...array);
  
  return (
    <div className="flex flex-col">
      <div className="array-container">
        {visualArray.map((element, index) => {
          // Calculate height as percentage of max value (5-100%)
          const heightPercent = (element.value / maxValue) * 95 + 5;
          
          // Determine color based on element state
          let className = 'array-item';
          if (element.state === 'comparing') {
            className += ' compared';
          } else if (element.state === 'sorted') {
            className += ' sorted';
          }
          
          return (
            <div
              key={index}
              className={className}
              style={{
                height: `${heightPercent}%`,
              }}
            >
              {array.length <= 20 ? element.value : ''}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-700 min-h-[2.5rem]">
        {currentStep > 0 && (
          <p>
            <span className="font-medium">Step {currentStep} of {totalSteps}:</span> {currentDescription}
          </p>
        )}
      </div>
    </div>
  );
};

