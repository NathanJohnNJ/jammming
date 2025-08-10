import React from 'react';
import {useMouseProximity} from '../lib/hooks';

const ProximityScaleElement = ({ 
  children, 
  minScale, 
  maxScale, 
  maxDistance,
  transitionDuration,
  ...props 
}) => {
  const { elementRef, scale } = useMouseProximity(minScale, maxScale, maxDistance);

  const elementStyle = {
    transform: `scale(${scale})`,
    transition: `transform ${transitionDuration} ease-out`,
    transformOrigin: 'center',
  };

  return (
    <div
      ref={elementRef}
      style={elementStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default ProximityScaleElement;
