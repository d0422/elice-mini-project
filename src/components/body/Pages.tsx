import { PAGE } from '@/constants/PAGE';
import styled from 'styled-components';

export const getRenderPageArray = (pageCount: number, currentPage: number) => {
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

  const getPrevData = () => currentPage != 1 && getPageData(currentPage - 1);
  const getNextData = () =>
    currentPage != pageCount && getPageData(currentPage + 1);

  if (!pageCount) return <></>;

  return (
    <PageWrapper>
      <Arrow $isFirstOrLast={currentPage === 1} onClick={getPrevData}>
        &lt;
      </Arrow>
      {renderPageArray.map((number) => (
        <Page
          key={number}
          $isCurrent={number === currentPage}
          onClick={() => getPageData(number)}
        >
          {number}
        </Page>
      ))}
      <Arrow $isFirstOrLast={currentPage === pageCount} onClick={getNextData}>
        &gt;
      </Arrow>
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
const Page = styled.button<{ $isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  color: ${(props) => (props.$isCurrent ? 'white' : '#999')};
  background-color: ${(props) => (props.$isCurrent ? '#524fa1' : 'none')};
  border: none;
  &:hover {
    color: ${(props) => (props.$isCurrent ? 'none' : '#524fa1')};
    font-weight: bold;
  }
`;

const Arrow = styled.button<{ $isFirstOrLast: boolean }>`
  color: ${(props) => (props.$isFirstOrLast ? '#ccc' : 'black')};
  border: none;
`;
