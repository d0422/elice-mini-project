import { getLabelText } from '../CourseCard';

describe('getLabelText 기능 테스트', () => {
  it('entrollType이 0이면 구독을 반환한다.', () => {
    expect(getLabelText(0, true)).toBe('구독');
    expect(getLabelText(0, false)).toBe('구독');
  });

  it('entrollType이 0이 아니면 true일때 무료, 아닐때 유료를 반환한다.', () => {
    expect(getLabelText(4, true)).toBe('무료');
    expect(getLabelText(4, false)).toBe('유료');
  });
});
