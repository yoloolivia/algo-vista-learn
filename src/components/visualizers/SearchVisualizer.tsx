
import React, { useState, useEffect } from 'react';
import { ArrayVisualizer } from './ArrayVisualizer';

interface SearchVisualizerProps {
  array: number[];
  algorithm: 'linear' | 'binary' | 'dfs' | 'bfs';
  speed: number;
  isRunning: boolean;
  target: number;
  onSearchComplete: (found: boolean, index: number) => void;
}

export const SearchVisualizer: React.FC<SearchVisualizerProps> = ({
  array,
  algorithm,
  speed,
  isRunning,
  target,
  onSearchComplete
}) => {
  const [visualArray, setVisualArray] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [animationTimeouts, setAnimationTimeouts] = useState<NodeJS.Timeout[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number | undefined>(undefined);
  
  // Reset visualArray when array changes
  useEffect(() => {
    setVisualArray([...array]);
    clearAnimations();
    setCurrentStep(0);
    setTotalSteps(0);
    setCurrentDescription("");
    setIsPaused(false);
    setCurrentIndex(undefined);
    setHighlightIndices([]);
    setFoundIndex(undefined);
  }, [array]);
  
  // Handle running/pausing
  useEffect(() => {
    if (isRunning && !isSearching && !isPaused) {
      startSearch();
    } else if (isRunning && isPaused) {
      continueSearch();
    } else if (!isRunning && isSearching) {
      pauseSearch();
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
    setIsSearching(false);
  };
  
  const continueSearch = () => {
    setIsPaused(false);
    startSearch(currentStep);
  };
  
  const startSearch = (startFromStep = 0) => {
    clearAnimations();
    setIsSearching(true);
    
    // Clone array for animations
    const animations: {
      highlight?: number[],
      current?: number,
      found?: number,
      description: string
    }[] = [];
    
    // Generate animations based on algorithm
    if (algorithm === 'linear') {
      linearSearch(array, target, animations);
    } else if (algorithm === 'binary') {
      binarySearch(array, target, animations);
    } else if (algorithm === 'dfs') {
      // Convert array to tree-like structure for DFS visualization
      const treeRoot = arrayToTree(array);
      depthFirstSearch(treeRoot, target, animations);
    } else if (algorithm === 'bfs') {
      // Convert array to tree-like structure for BFS visualization
      const treeRoot = arrayToTree(array);
      breadthFirstSearch(treeRoot, target, animations);
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
        // Apply animation
        if (animation.highlight !== undefined) {
          setHighlightIndices(animation.highlight);
        }
        
        if (animation.current !== undefined) {
          setCurrentIndex(animation.current);
        }
        
        if (animation.found !== undefined) {
          setFoundIndex(animation.found);
        }
        
        setCurrentDescription(animation.description);
        setCurrentStep(actualStepIndex + 1);
        
        // Check if it's the last animation
        if (actualStepIndex === animations.length - 1) {
          setIsSearching(false);
          // If found is defined in the last animation, consider the search complete
          const found = animation.found !== undefined;
          onSearchComplete(found, found ? animation.found! : -1);
        }
      }, index * animationSpeed);
      
      newTimeouts.push(timeout);
    });
    
    setAnimationTimeouts(newTimeouts);
  };
  
  const pauseSearch = () => {
    clearAnimations();
    setIsPaused(true);
  };
  
  // Search algorithms with animation recording
  const linearSearch = (arr: number[], targetValue: number, animations: any[]) => {
    animations.push({
      description: `Starting linear search for value ${targetValue}`
    });
    
    for (let i = 0; i < arr.length; i++) {
      animations.push({
        current: i,
        description: `Checking position ${i}: Is ${arr[i]} equal to ${targetValue}?`
      });
      
      if (arr[i] === targetValue) {
        animations.push({
          found: i,
          description: `Found ${targetValue} at position ${i}!`
        });
        return;
      }
    }
    
    animations.push({
      description: `Value ${targetValue} not found in the array`
    });
  };
  
  const binarySearch = (arr: number[], targetValue: number, animations: any[]) => {
    // Binary search requires a sorted array
    const sortedArr = [...arr].sort((a, b) => a - b);
    
    animations.push({
      description: `Starting binary search for value ${targetValue} in a sorted array`
    });
    
    let left = 0;
    let right = sortedArr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      animations.push({
        current: mid,
        highlight: [left, right],
        description: `Checking middle position ${mid}: Is ${sortedArr[mid]} equal to ${targetValue}?`
      });
      
      if (sortedArr[mid] === targetValue) {
        animations.push({
          found: mid,
          description: `Found ${targetValue} at position ${mid}!`
        });
        return;
      }
      
      if (sortedArr[mid] < targetValue) {
        animations.push({
          highlight: [mid + 1, right],
          description: `${sortedArr[mid]} < ${targetValue}, searching right half`
        });
        left = mid + 1;
      } else {
        animations.push({
          highlight: [left, mid - 1],
          description: `${sortedArr[mid]} > ${targetValue}, searching left half`
        });
        right = mid - 1;
      }
    }
    
    animations.push({
      description: `Value ${targetValue} not found in the array`
    });
  };
  
  // Helper function to convert array to a simple binary tree structure for visualization
  interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    index: number;
  }
  
  const arrayToTree = (arr: number[]): TreeNode | null => {
    if (arr.length === 0) return null;
    
    const buildTree = (start: number, end: number, index = 0): TreeNode | null => {
      if (start > end) return null;
      
      const mid = Math.floor((start + end) / 2);
      const node: TreeNode = {
        value: arr[mid],
        left: null,
        right: null,
        index: mid
      };
      
      node.left = buildTree(start, mid - 1, 2 * index + 1);
      node.right = buildTree(mid + 1, end, 2 * index + 2);
      
      return node;
    };
    
    return buildTree(0, arr.length - 1);
  };
  
  const depthFirstSearch = (root: TreeNode | null, targetValue: number, animations: any[], visited: number[] = []) => {
    if (!root) {
      animations.push({
        description: `Node is null, backtracking...`
      });
      return false;
    }
    
    animations.push({
      current: root.index,
      description: `Visiting node with value ${root.value}`
    });
    
    visited.push(root.index);
    
    if (root.value === targetValue) {
      animations.push({
        found: root.index,
        description: `Found ${targetValue} at position ${root.index}!`
      });
      return true;
    }
    
    animations.push({
      description: `${root.value} != ${targetValue}, exploring left subtree`
    });
    
    if (depthFirstSearch(root.left, targetValue, animations, visited)) {
      return true;
    }
    
    animations.push({
      description: `Left subtree didn't contain ${targetValue}, exploring right subtree`
    });
    
    if (depthFirstSearch(root.right, targetValue, animations, visited)) {
      return true;
    }
    
    animations.push({
      description: `${targetValue} not found in subtree rooted at ${root.value}, backtracking...`
    });
    
    return false;
  };
  
  const breadthFirstSearch = (root: TreeNode | null, targetValue: number, animations: any[]) => {
    if (!root) {
      animations.push({
        description: `Tree is empty, nothing to search`
      });
      return;
    }
    
    const queue: TreeNode[] = [];
    queue.push(root);
    
    animations.push({
      description: `Starting BFS search for value ${targetValue}`
    });
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      animations.push({
        current: current.index,
        description: `Checking node with value ${current.value}`
      });
      
      if (current.value === targetValue) {
        animations.push({
          found: current.index,
          description: `Found ${targetValue} at position ${current.index}!`
        });
        return;
      }
      
      if (current.left) {
        animations.push({
          highlight: [current.left.index],
          description: `Enqueuing left child with value ${current.left.value}`
        });
        queue.push(current.left);
      }
      
      if (current.right) {
        animations.push({
          highlight: [current.right.index],
          description: `Enqueuing right child with value ${current.right.value}`
        });
        queue.push(current.right);
      }
    }
    
    animations.push({
      description: `Value ${targetValue} not found in the tree`
    });
  };

  // Determine if we need a sorted array for binary search  
  const isSorted = algorithm === 'binary';
  const arrayToDisplay = isSorted ? [...array].sort((a, b) => a - b) : array;
  
  return (
    <div className="flex flex-col">
      <ArrayVisualizer 
        array={arrayToDisplay} 
        highlightIndices={highlightIndices}
        currentIndex={currentIndex}
        foundIndex={foundIndex}
        targetValue={target}
        isSorted={isSorted}
      />
      
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
