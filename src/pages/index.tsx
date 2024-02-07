import getCourse, { GetCourseParams } from '@/api/getCourse';
import CourseCard from '@/components/body/CourseCard';
import ResultBody from '@/components/body/ResultBody';
import Search from '@/components/searchArea/Search';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<OrgCourseListResponses>();

  const params: GetCourseParams = {
    title: String(router.query.keyword),
    enroll_type: 0,
    is_free: true,
  };

  useEffect(() => {
    getCourse(params).then((res) => {
      setData(res);
    });
  }, [router.query]);

  if (!data) return <div>로딩중</div>;

  return (
    <PageWrapper>
      <Search />
      <ResultBody data={data} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
