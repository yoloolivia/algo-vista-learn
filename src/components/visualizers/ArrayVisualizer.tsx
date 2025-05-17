
import React from 'react';

interface ArrayVisualizerProps {
  array: number[];
  highlightIndices?: number[];
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  array,
  highlightIndices = []
}) => {
  // Calculate bar heights based on array values
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="array-container">
      {array.map((value, index) => {
        // Calculate height as percentage of max value (5-100%)
        const heightPercent = (value / maxValue) * 95 + 5;
        
        // Determine if this element is highlighted
        const isHighlighted = highlightIndices.includes(index);
        
        return (
          <div
            key={index}
            className={`array-item ${isHighlighted ? 'current' : ''}`}
            style={{
              height: `${heightPercent}%`,
            }}
          >
            {array.length <= 30 ? value : ''}
          </div>
        );
      })}
    </div>
  );
};
