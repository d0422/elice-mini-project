import styled from 'styled-components';
import ChartIconSVG from '../svg/ChartIconSVG';
import LabtopIconSVG from '../svg/LabtopIconSVG';
import CalendarIconSVG from '../svg/CalendarIIconSVG';

export default function CourseInfoIcons() {
  return (
    <div>
      <IconWrapper>
        <ChartIconSVG width={24} height={24} color="#777777" />
        <div>난이도: 미설정</div>
      </IconWrapper>
      <IconWrapper>
        <LabtopIconSVG width={24} height={24} color="#777777" />
        <div>수업: 온라인</div>
      </IconWrapper>
      <IconWrapper>
        <CalendarIconSVG width={24} height={24} color="#777777" />
        <div>기간: 무제한</div>
      </IconWrapper>
    </div>
  );
}
const CourseInfoIconsWrapper = styled.div``;

const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > div {
    font-size: 12px;
    color: #7d7e80;
  }
`;
