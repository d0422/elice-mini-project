import { act, renderHook, waitFor } from '@testing-library/react';
import useCoursePage from '../useCoursePage';
import getCourse from '../getCourse';

jest.mock('../getCourse');
jest.mock('@hooks/useQueryParams', () =>
  jest.fn(() => ({
    getValue: jest.fn(() => 'C언어'),
    getAllParams: jest.fn(() => [
      {
        is_free: false,
        enroll_type: 0,
      },
    ]),
  }))
);

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    isReady: true,
    query: { keyword: 'C언어' },
  })),
}));

describe('useCoursePage 기능 테스트', () => {
  it('data, currentPage, pageCount를 제대로 표기할 수 있다.', async () => {
    (getCourse as jest.Mock).mockResolvedValue({
      course_count: 5,
      courses: {},
    });

    const { result } = renderHook(() => useCoursePage());
    expect(getCourse).toHaveBeenCalledWith({
      title: 'C언어',
      chips: [
        {
          is_free: false,
          enroll_type: 0,
        },
      ],
      offset: 0,
    });
    await waitFor(() => {
      expect(result.current.data).toStrictEqual({
        course_count: 5,
        courses: {},
      });
      expect(result.current.pageCount).toBe(1);
      expect(result.current.currentPage).toBe(1);
      expect(result.current.isError).toBeFalsy();
    });
  });

  it('api 호출시 오류가 난 경우 isError는 true가 된다.', async () => {
    (getCourse as jest.Mock).mockRejectedValue({});

    const { result } = renderHook(() => useCoursePage());
    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('getPageData를 통해 page를 이동시킬 수 있다.', async () => {
    window.scrollTo = jest.fn();
    (getCourse as jest.Mock).mockResolvedValue({
      course_count: 5,
      courses: {},
    });
    const { result } = renderHook(() => useCoursePage());
    act(() => result.current.getPageData(5));
    waitFor(() => expect(result.current.currentPage).toBe(5));
  });
});
