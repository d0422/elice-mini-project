import { useRef } from 'react';

export default function useDebouce<T>(
  callback: (value?: T) => void,
  debounceMS: number
) {
  const timer = useRef<NodeJS.Timeout>();

  const debounce = (value?: T) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(value), debounceMS);
  };

  return debounce;
}
