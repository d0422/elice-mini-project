import { addEachQueryValue } from '../routerQueryString';

describe('addEachQueryValue 기능 테스트', () => {
  it.each([
    [['1', '2'], '3', ['1', '2', '3']],
    [['free', 'paid'], 'plus', ['free', 'paid', 'plus']],
  ])(
    'prev QueryValue가 string[]배열이면 마지막 요소에 추가한다.',
    (prev, current, expected) => {
      expect(addEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );

  it.each([
    ['1', '2', ['1', '2']],
    ['free', 'paid', ['free', 'paid']],
  ])(
    'prev QueryValue가 string이면 string[]로 변경하고 마지막 요소에 추가한다.',
    (prev, current, expected) => {
      expect(addEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );

  it.each([
    [undefined, '1', '1'],
    [undefined, 'free', 'free'],
  ])(
    'prev QueryValue가 undefined면 string을 반환한다.',
    (prev, current, expected) => {
      expect(addEachQueryValue(prev, current)).toStrictEqual(expected);
    }
  );
});
