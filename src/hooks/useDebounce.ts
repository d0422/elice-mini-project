import { useRef } from 'react';

export default function useDebouce(callback: () => void, debounceMS: number) {
  const timer = useRef<NodeJS.Timeout>();

  const debounce = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(callback, debounceMS);
  };

  return debounce;
}
