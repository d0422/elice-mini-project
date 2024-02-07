import { useEffect, useState } from 'react';
import getCourse, { GetCourseParams } from './getCourse';
import { useRouter } from 'next/router';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';

export default function useCoursePage() {
  const [data, setData] = useState<OrgCourseListResponses>();
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const params: GetCourseParams = {
      title: String(router.query.keyword),
      enroll_type: 0,
      is_free: false,
      offset: 0,
    };
    getCourse(params).then((res) => {
      setData(res);
    });
  }, [router.query]);

  useEffect(() => {
    const params: GetCourseParams = {
      title: String(router.query.keyword),
      enroll_type: 0,
      is_free: false,
      offset: page * 20,
    };
    getCourse(params).then((res) => {
      setData(res);
    });
  }, [page]);

  const getPageData = (page: number) => {
    window.scrollTo({ top: 0 });
    setPage(page);
  };

  return {
    data,
    currentPage: page,
    pageCount: data ? Math.ceil(data.course_count / 20) : 0,
    getPageData,
  };
}
