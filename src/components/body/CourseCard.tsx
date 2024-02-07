import { OrgCourseData } from '@/types/OrgCourseListResponse';
import styled from 'styled-components';
import CourseInfoIcons from './CourseInfoIcons';
import Image from 'next/image';

const getLabelText = (
  entrollType: OrgCourseData['enroll_type'],
  isFree: OrgCourseData['is_free']
) => {
  if (entrollType === 0) return '구독';
  if (isFree) return '무료';
  return '유료';
};

export default function CourseCard({ data }: { data: OrgCourseData }) {
  return (
    <CourseCardWrapper>
      <Body>
        <Label>{getLabelText(data.enroll_type, data.is_free)}</Label>
        <Title>{data.title}</Title>
        <Description>{data.short_description}</Description>
        <CardCenterSection>
          <CourseInfoIcons />
          <Logo>
            {data.logo_file_url && (
              <Image src={data.logo_file_url} alt="logo_icon" fill />
            )}
          </Logo>
        </CardCenterSection>
      </Body>
    </CourseCardWrapper>
  );
}

const CourseCardWrapper = styled.div`
  width: 296px;
  height: 338px;
  border-radius: 8px;
  border: none;
  background-color: white;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 24px;
  padding-right: 24px;
  gap: 16px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #524fa1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.6;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.div`
  font-size: 14px;
  color: #5e5f61;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardCenterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const Logo = styled.div`
  width: 52px;
  height: 52px;
  object-fit: contain;
  object-position: center;
  position: relative;
`;
