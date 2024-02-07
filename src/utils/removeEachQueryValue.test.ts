import { removeEachQueryValue } from './routerQueryString';

describe('removeEachQueryValue 기능 테스트', () => {
  it.each([
    [['1', '2'], '2', ['1']],
    [['free', 'paid'], 'paid', ['free']],
  ])(
    'prev QueryValue가 string[]배열이고, 해당 요소가 있으면 배열에서 제거한다.',
    (prev, current, expected) => {
      expect(removeEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );

  it.each([
    ['1', '2', undefined],
    ['free', 'paid', undefined],
  ])(
    'prev QueryValue가 string이면 undefined를 반환한다.',
    (prev, current, expected) => {
      expect(removeEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );

  it.each([
    [undefined, '1', undefined],
    [undefined, 'free', undefined],
  ])(
    'prev QueryValue가 undefined면 undefined를 반환한다.',
    (prev, current, expected) => {
      expect(removeEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );
});
