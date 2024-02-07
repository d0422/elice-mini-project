import { useState } from 'react';

export default function useInput(
  initialInput?: string,
  additionalChange?: (value: string) => void
) {
  const [value, setValue] = useState(initialInput || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (additionalChange) additionalChange(e.target.value);

    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return { value, handleChange, reset };
}
