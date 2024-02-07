import useInput from '@/hooks/useInput';
import styled from 'styled-components';
import SearchIconSVG from '../svg/SearchIconSVG';
import useDebouce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounce = useDebouce<string>((keyword) => {
    router.push({ query: { keyword } });
  }, 300);

  const { value, handleChange } = useInput(
    searchParams.get('keyword') || '',
    debounce
  );

  return (
    <SearchWrapper>
      <SearchIcon>
        <SearchIconSVG width={16} height={16} />
      </SearchIcon>
      <SearchInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="배우고 싶은 언어 기술을 검색해보세요"
      />
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  border-color: rgb(201, 202, 204);
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  background-color: white;
`;

const SearchIcon = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  ::placeholder {
    color: gray;
  }
`;
