
import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
  highlightIndices?: number[];
  currentIndex?: number;
  targetValue?: number;
  foundIndex?: number;
  isSorted?: boolean;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  highlightIndices = [],
  currentIndex,
  targetValue,
  foundIndex,
  isSorted = false
}) => {
  // Calculate bar heights based on array values
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="flex flex-col">
      <div className="array-container">
        {array.map((value, index) => {
          // Calculate height as percentage of max value (5-100%)
          const heightPercent = (value / maxValue) * 95 + 5;
          
          // Determine if this element is highlighted
          const isHighlighted = highlightIndices.includes(index);
          const isCurrent = currentIndex === index;
          const isFound = foundIndex === index;
          
          let className = 'array-item';
          if (isFound) {
            className += ' found';
          } else if (isCurrent) {
            className += ' current';
          } else if (isHighlighted) {
            className += ' compared';
          }
          
          return (
            <div
              key={index}
              className={className}
              style={{
                height: `${heightPercent}%`,
              }}
            >
              {array.length <= 30 ? value : ''}
              {value === targetValue && <div className="target-indicator"></div>}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-700">
        <p>Array visualization</p>
        {isSorted && <p className="text-xs text-gray-500">(sorted for binary search)</p>}
      </div>
    </div>
  );
};
