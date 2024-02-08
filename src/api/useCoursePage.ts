import { useEffect, useState } from 'react';
import getCourse, { GetCourseParams } from './getCourse';
import { NextRouter, useRouter } from 'next/router';
import { OrgCourseListResponses } from '@/types/OrgCourseListResponse';
import { CHIPS, CHIPS_ARRAY } from '@/constants/CHIP_TYPE';
import { alreadyExistQueryValue } from '@/utils/routerQueryString';
import useQueryParams from '@/hooks/useQueryParams';

const getChipsParamsData = (router: NextRouter) => {
  const result = CHIPS_ARRAY.map((chip) =>
    Object.values(CHIPS[chip]).filter(({ value }) =>
      alreadyExistQueryValue(router.query[chip], value)
    )
  ).flat();

  return result.map((chipValue) => chipValue.params);
};

export default function useCoursePage() {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<OrgCourseListResponses>();
  const [page, setPage] = useState(1);
  const { getValue } = useQueryParams();

  const router = useRouter();

  useEffect(() => {
    setPage(1);
  }, [router.query]);

  useEffect(() => {
    if (!router.isReady) return;
    const params: GetCourseParams = {
      title: String(getValue('keyword')),
      chips: getChipsParamsData(router),
      offset: (page - 1) * 20,
    };

    getCourse(params)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [page, router.isReady, router.query]);

  const getPageData = (page: number) => {
    window.scrollTo({ top: 0 });
    setPage(page);
  };

  return {
    data,
    isError,
    currentPage: page,
    pageCount: data ? Math.ceil(data.course_count / 20) : 0,
    getPageData,
  };
}
