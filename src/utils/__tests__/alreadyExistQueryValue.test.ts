import { alreadyExistQueryValue } from '../routerQueryString';

describe('alreadyExistQueryValue', () => {
  it.each([
    [['1', '2'], '2', true],
    [['1', '2'], '3', false],
    [['free', 'paid'], 'free', true],
    [['free', 'paid'], 'tt', false],
  ])(
    'prev가 배열일때, 배열내부에 current와 동일한 값이 있으면 true를 반환하고, 없으면 flase를 반환할 수 있다.',
    (prev, current, expected) => {
      expect(alreadyExistQueryValue(prev, current)).toStrictEqual(expected);
    }
  );

  it.each([
    ['2', '2', true],
    ['2', '3', false],
    ['free', 'free', true],
    ['free', 'tt', false],
  ])(
    'prev가 string일때,  current와 동일하면 true를 반환하고, 없으면 flase를 반환할 수 있다.',
    (prev, current, expected) => {
      expect(alreadyExistQueryValue(prev, current)).toStrictEqual(expected);
    }
  );
});
