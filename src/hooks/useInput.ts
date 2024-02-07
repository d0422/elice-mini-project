import { useState } from 'react';

export default function useInput(
  initialInput?: string,
  additionaChange?: (value: string) => void
) {
  const [value, setValue] = useState(initialInput || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (additionaChange) additionaChange(e.target.value);

    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return { value, handleChange, reset };
}
