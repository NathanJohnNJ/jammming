import { useMemo } from 'react';

export const useDateFormatter = (dateString) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${date.toLocaleDateString('en-GB', { 
      month: 'long', 
      year: 'numeric' 
    }).replace(/^\d+\s/, '')}`;
  };
  
  return formatDate(dateString);
};


export function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const pad = (num, size) => String(num).padStart(size, '0');

  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
}

export const useTimeFormatter = (ms) => {
  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    const pad = (num, size) => String(num).padStart(size, '0');

    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
  }
  return formatTime(ms);
}