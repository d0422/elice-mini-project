import { useEffect, useState } from 'react';
import getCourse, { GetCourseParams } from './getCourse';
import { NextRouter, useRouter } from 'next/router';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import { CHIPS, CHIPS_ARRAY } from '@/constants/CHIP_TYPE';
import { alreadyExistQueryValue } from '@/utils/routerQueryString';

const getChipsParamsData = (router: NextRouter) => {
  const result = CHIPS_ARRAY.map((chip) =>
    Object.values(CHIPS[chip]).filter(({ value }) =>
      alreadyExistQueryValue(router.query[chip], value)
    )
  ).flat();

  return result.map((chipValue) => chipValue.params);
};

export default function useCoursePage() {
  const [data, setData] = useState<OrgCourseListResponses>();
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const params: GetCourseParams = {
      title: String(router.query.keyword),
      chips: getChipsParamsData(router),
      offset: 0,
    };
    getCourse(params).then((res) => {
      setData(res);
    });
  }, [router.query]);

  useEffect(() => {
    const params: GetCourseParams = {
      title: String(router.query.keyword),
      chips: getChipsParamsData(router),
      offset: (page - 1) * 20,
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
