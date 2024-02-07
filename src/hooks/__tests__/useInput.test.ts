import { renderHook, act } from '@testing-library/react';
import useInput from '../useInput';
import React from 'react';

describe('useInput기능 테스트', () => {
  it('useInput의 초기값을 설정할 수 있다.', () => {
    const testFn = jest.fn();
    const initialInput = 'TEST';
    const { result } = renderHook(() => useInput(initialInput, testFn));
    expect(result.current.value).toStrictEqual('TEST');
  });

  it('useInput에 additionalChange로 주입시킨 함수를 event.target.value를 인자로 하여 수행시킬 수 있다.', () => {
    const testFn = jest.fn();

    const event = {
      target: { value: '1' },
    } as React.ChangeEvent<HTMLInputElement>;

    const { result } = renderHook(() => useInput('', testFn));
    act(() => result.current.handleChange(event));

    expect(testFn).toHaveBeenCalledWith('1');
  });
});
