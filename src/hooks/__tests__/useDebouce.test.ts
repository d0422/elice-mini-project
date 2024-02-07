import { renderHook } from '@testing-library/react';
import useDebouce from '../useDebounce';
describe('useDebounce 기능 테스트', () => {
  jest.useFakeTimers();
  it('useDebounce로 반환되는 함수는 호출후 특정 초 이후에 수행된다.', () => {
    const testFn = jest.fn();
    const { result } = renderHook(() => useDebouce(testFn, 1000));
    result.current();
    setTimeout(() => {
      expect(testFn).toHaveBeenCalled();
    }, 1000);
    jest.runAllTimers();
  });

  it('useDebounce는 두개 이상 사용할 수 있으며, 각각 작동한다.', () => {
    const testFn = jest.fn();
    const testFn2 = jest.fn();
    const { result } = renderHook(() => useDebouce(testFn, 1000));
    const { result: result2 } = renderHook(() => useDebouce(testFn2, 2000));

    result.current();
    result2.current();
    setTimeout(() => {
      expect(testFn).toHaveBeenCalled();
    }, 1000);
    setTimeout(() => {
      expect(testFn2).toHaveBeenCalled();
    }, 2000);
    jest.runAllTimers();
  });

  it('useDebounce는 콜백함수로 value를 입력받을 수 있다.', () => {
    const testFn = jest.fn();
    const { result } = renderHook(() =>
      useDebouce((value) => testFn(value), 1000)
    );

    result.current(1);
    setTimeout(() => {
      expect(testFn).toHaveBeenCalledWith(1);
    }, 1000);
    jest.runAllTimers();
  });
});
