import styled from 'styled-components';
import { COURSE_INFO_ICONS_ARRAY } from '@/constants/COURSE_INFO_ICONS';

export default function CourseInfoIcons() {
  return (
    <div>
      {COURSE_INFO_ICONS_ARRAY.map(({ Icon, information }, index) => (
        <IconWrapper key={information + index}>
          <Icon width={24} height={24} color="#777777" />
          <div>{information}</div>
        </IconWrapper>
      ))}
    </div>
  );
}

const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > div {
    font-size: 12px;
    color: #7d7e80;
  }
`;
