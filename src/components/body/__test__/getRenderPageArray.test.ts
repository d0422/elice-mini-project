import { getRenderPageArray } from '../Pages';

describe('getRenderPageArray 기능 테스트', () => {
  it.each([
    [4, 3, [1, 2, 3, 4]],
    [5, 3, [1, 2, 3, 4, 5]],
    [8, 3, [1, 2, 3, 4, 5, 6, 7]],
    [8, 5, [1, 2, 3, 4, 5, 6, 7, 8]],
    [15, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
    [15, 10, [6, 7, 8, 9, 10, 11, 12, 13, 14]],
    [1, 1, [1]],
  ])('getRenderPageArray 기능 테스트', (pageCount, currentPage, expected) => {
    expect(getRenderPageArray(pageCount, currentPage)).toStrictEqual(expected);
  });
});
