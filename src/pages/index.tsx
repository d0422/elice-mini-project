import useCoursePage from '@/api/useCoursePage';
import Pages from '@/components/body/Pages';
import ResultBody from '@/components/body/ResultBody';
import Filter from '@/components/filter/Filter';
import Search from '@/components/searchArea/Search';
import styled from 'styled-components';

export default function Home() {
  const { isError, data, currentPage, pageCount, getPageData } =
    useCoursePage();

  if (isError) return <div>에러가 발생했습니다! 잠시후에 시도해주세요!</div>;

  if (!data) return <div>로딩중</div>;

  return (
    <PageWrapper>
      <Search />
      <Filter />
      <ResultBody data={data} />
      <Pages
        currentPage={currentPage}
        pageCount={pageCount}
        getPageData={getPageData}
      />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
