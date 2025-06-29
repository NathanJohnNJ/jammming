import { useState, useLayoutEffect } from 'react';


export function useSpotifyToken(){
  const [ token, setToken ] = useState(null);


  return [token, setToken];
}


export function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateWindowSize() {
      if (window.innerWidth <= 1600){
        setWindowSize([window.innerWidth, window.innerHeight]);
      } else {
        setWindowSize([1600, window.innerHeight]);
      }
    }
    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);
  return windowSize;
};