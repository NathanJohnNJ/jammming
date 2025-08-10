import { useState, useEffect, useRef, useCallback } from 'react';

export const useMouseProximity = (minScale = 0.5, maxScale = 1.5, maxDistance = 200) => {
  const [scale, setScale] = useState(minScale);
  const elementRef = useRef(null);

  const calculateDistance = useCallback((mouseX, mouseY, elementRect) => {
    // Calculate the center of the element
    const centerX = elementRect.left + elementRect.width / 2;
    const centerY = elementRect.top + elementRect.height / 2;
    
    // Calculate distance using Pythagorean theorem
    return Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!elementRef.current) return;

    const elementRect = elementRef.current.getBoundingClientRect();
    const distance = calculateDistance(event.clientX, event.clientY, elementRect);
    
    // Calculate scale based on distance (inverse relationship)
    // Closer mouse = larger scale, farther mouse = smaller scale
    let newScale;
    if (distance <= maxDistance) {
      // Linear interpolation between maxScale and minScale
      const distanceRatio = distance / maxDistance;
      newScale = maxScale - (distanceRatio * (maxScale - minScale));
    } else {
      newScale = minScale;
    }
    
    setScale(newScale);
  }, [calculateDistance, maxDistance, maxScale, minScale]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return { elementRef, scale };
};

