import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import useQueryParams from '../useQueryParams';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useQueryParams 기능 테스트', () => {
  const push = jest.fn();

  it('add 기능 테스트; 새로운 key를 추가할 수 있다.', () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {},
      push,
    }));

    const { result } = renderHook(() => useQueryParams());

    result.current.add('keyword', 'C언어');
    expect(push).toHaveBeenCalledWith({
      query: { keyword: 'C언어' },
    });
  });

  it('add 기능 테스트; 새로운 key를 추가해도 기존키에는 영향을 주지 않는다.', () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        price: ['paid'],
      },
      push,
    }));

    const { result } = renderHook(() => useQueryParams());

    result.current.add('keyword', 'C언어');
    expect(push).toHaveBeenCalledWith({
      query: { keyword: 'C언어', price: ['paid'] },
    });
  });

  it('remove 기능 테스트; 기존 문자가 string이고 해당 문자를 삭제하는 경우 undefined가 반환된다. ', () => {
    const queryObject = {
      keyword: 'C언어',
    };

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));

    const { result } = renderHook(() => useQueryParams());
    result.current.remove('keyword', 'C언어');
    expect(queryObject.keyword).toBe(undefined);
  });

  it('remove 기능 테스트; 기존 문자가 string[]이고 해당 문자를 삭제하는 경우 해당 문자가 삭제된 배열이 반환된다. ', () => {
    const queryObject = {
      price: ['paid', 'free'],
    };

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));

    const { result } = renderHook(() => useQueryParams());
    result.current.remove('price', 'paid');
    expect(push).toHaveBeenCalledWith({
      query: {
        price: ['free'],
      },
    });
  });

  it('clear 기능 테스트; 해당 키를 비운다', () => {
    const queryObject = { keyword: 'some', price: ['paid', 'free'] };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));

    const { result } = renderHook(() => useQueryParams());
    result.current.clear('price');
    expect(queryObject).toStrictEqual({
      keyword: 'some',
    });
  });

  it('change 기능테스트 해당 키 전체를 입력값으로 변경한다.', () => {
    const queryObject = { keyword: 'some', price: ['paid', 'free'] };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));

    const { result } = renderHook(() => useQueryParams());
    result.current.change('keyword', 'hello');

    expect(push).toHaveBeenCalledWith({
      query: {
        keyword: 'hello',
        price: ['paid', 'free'],
      },
    });
  });

  it('getValue 기능테스트', () => {
    const queryObject = { keyword: 'some', price: ['paid', 'free'] };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));
    const { result } = renderHook(() => useQueryParams());
    const keyword = result.current.getValue('keyword');
    expect(keyword).toBe('some');
    const price = result.current.getValue('price');
    expect(price).toStrictEqual(['paid', 'free']);
  });

  it('search 기능테스트', () => {
    const queryObject = { keyword: 'some', price: ['paid', 'free'] };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: queryObject,
      push,
    }));
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.search('keyword', 'some')).toBeTruthy();
    expect(result.current.search('price', 'paid')).toBeTruthy();
    expect(result.current.search('price', 'free')).toBeTruthy();
  });
});
