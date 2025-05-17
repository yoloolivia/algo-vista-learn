
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
  
  // Reset visualArray when array changes
  useEffect(() => {
    setVisualArray(array.map(value => ({ value, state: 'default' })));
    clearAnimations();
  }, [array]);
  
  // Handle running/pausing
  useEffect(() => {
    if (isRunning && !isSorting) {
      startSorting();
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
  
  const startSorting = () => {
    clearAnimations();
    setIsSorting(true);
    
    // Clone array for animations
    const animations: { compare?: [number, number], swap?: [number, number], sorted?: number[] }[] = [];
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
    
    // Process animations with delays
    const newTimeouts: NodeJS.Timeout[] = [];
    const animationSpeed = 1000 - speed * 9; // Convert speed (1-100) to delay (100-1000ms)
    
    animations.forEach((animation, index) => {
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
        
        // Check if it's the last animation
        if (index === animations.length - 1) {
          // Mark all as sorted at the end
          setTimeout(() => {
            setVisualArray(prev => prev.map(el => ({ ...el, state: 'sorted' })));
            setIsSorting(false);
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
  };
  
  // Sorting algorithms with animation recording
  const bubbleSort = (arr: number[], animations: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ compare: [j, j+1] });
        
        if (arr[j] > arr[j+1]) {
          animations.push({ swap: [j, j+1] });
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        }
      }
      animations.push({ sorted: [arr.length - i - 1] });
    }
  };
  
  const selectionSort = (arr: number[], animations: any[]) => {
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      
      for (let j = i + 1; j < arr.length; j++) {
        animations.push({ compare: [minIdx, j] });
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      if (minIdx !== i) {
        animations.push({ swap: [i, minIdx] });
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      
      animations.push({ sorted: [i] });
    }
  };
  
  const insertionSort = (arr: number[], animations: any[]) => {
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      
      while (j > 0) {
        animations.push({ compare: [j, j-1] });
        
        if (arr[j] < arr[j-1]) {
          animations.push({ swap: [j, j-1] });
          [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
          j--;
        } else {
          break;
        }
      }
      
      animations.push({ sorted: Array.from({ length: i + 1 }, (_, idx) => idx) });
    }
  };
  
  const mergeSort = (arr: number[], low: number, high: number, aux: number[], animations: any[]) => {
    if (low >= high) return;
    
    const mid = Math.floor((low + high) / 2);
    mergeSort(arr, low, mid, aux, animations);
    mergeSort(arr, mid + 1, high, aux, animations);
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
        animations.push({ compare: [k, j] });
        arr[k] = aux[j++];
      } else if (j > high) {
        animations.push({ compare: [k, i] });
        arr[k] = aux[i++];
      } else if (aux[i] <= aux[j]) {
        animations.push({ compare: [i, j] });
        arr[k] = aux[i++];
      } else {
        animations.push({ compare: [i, j] });
        arr[k] = aux[j++];
      }
    }
    
    // Mark the entire subarray as sorted
    animations.push({ sorted: Array.from({ length: high - low + 1 }, (_, idx) => low + idx) });
  };
  
  const quickSort = (arr: number[], low: number, high: number, animations: any[]) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, animations);
      animations.push({ sorted: [pivotIndex] });
      
      quickSort(arr, low, pivotIndex - 1, animations);
      quickSort(arr, pivotIndex + 1, high, animations);
    } else if (low === high) {
      animations.push({ sorted: [low] });
    }
  };
  
  const partition = (arr: number[], low: number, high: number, animations: any[]): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      animations.push({ compare: [j, high] }); // Compare with pivot
      
      if (arr[j] <= pivot) {
        i++;
        animations.push({ swap: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    animations.push({ swap: [i + 1, high] });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
  };
  
  // Calculate bar heights based on array values
  const maxValue = Math.max(...array);
  
  return (
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
  );
};
