import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import styled from 'styled-components';
import CourseCard from './CourseCard';

export default function ResultBody({ data }: { data: OrgCourseListResponses }) {
  return (
    <ResultWrapper>
      <Count>전체 {data.course_count}개</Count>
      <Body>
        {data.courses.map((course, index) => (
          <CourseCard key={course.title + index} data={course} />
        ))}
      </Body>
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const Count = styled.div`
  font-weight: bold;
  font-size: 16px;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
