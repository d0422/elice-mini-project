import { PAGE } from '@/constants/PAGE';
import styled from 'styled-components';

const getRenderPageArray = (pageCount: number, currentPage: number) => {
  const pageEnd =
    currentPage + PAGE.SHOW_LIMIT > pageCount
      ? pageCount
      : currentPage + PAGE.SHOW_LIMIT;
  const pageStart =
    currentPage - PAGE.SHOW_LIMIT > 0 ? currentPage - PAGE.SHOW_LIMIT : 1;

  return Array.from({ length: pageEnd - pageStart + 1 }).map(
    (_, i) => i + pageStart
  );
};

export default function Pages({
  pageCount,
  currentPage,
  getPageData,
}: {
  pageCount: number;
  currentPage: number;
  getPageData: (pageNum: number) => void;
}) {
  const renderPageArray = getRenderPageArray(pageCount, currentPage);
  return (
    <PageWrapper>
      {renderPageArray.map((number) => (
        <Page
          isCurrent={number === currentPage}
          onClick={() => getPageData(number)}
        >
          {number}
        </Page>
      ))}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Page = styled.button<{ isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  color: ${(props) => (props.isCurrent ? 'white' : '#999')};
  background-color: ${(props) => (props.isCurrent ? '#524fa1' : 'none')};
  border: none;
  &:hover {
    color: ${(props) => (props.isCurrent ? 'none' : '#524fa1')};
    font-weight: bold;
  }
`;
