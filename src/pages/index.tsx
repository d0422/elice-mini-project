import getCourse, { GetCourseParams } from '@/api/getCourse';
import Search from '@/components/searchArea/Search';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
    <>
      <Search />
    </>
  );
}
