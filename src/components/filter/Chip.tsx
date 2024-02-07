import { CHIPS, ChipType, ChipValue } from '@/constants/CHIP_TYPE';
import useQueryParams from '@/hooks/useQueryParams';
import { useState } from 'react';
import styled from 'styled-components';

interface ChipProps {
  type: ChipType;
  value: ChipValue;
}

export default function Chip({ type, value }: ChipProps) {
  const { add, remove, search } = useQueryParams();

  const [isClicked, setIsClicked] = useState(search(type, value));

  const handleClick = () => {
    if (!isClicked) add(type, value);
    else remove(type, value);

    setIsClicked((prev) => !prev);
  };

  return (
    <ChipWrapper onClick={handleClick} $isClicked={isClicked}>
      <div>{CHIPS[type][value].title}</div>
    </ChipWrapper>
  );
}

const ChipWrapper = styled.button<{ $isClicked: boolean }>`
  background-color: ${(props) =>
    props.$isClicked ? 'rgb(66, 63, 140)' : 'rgb(225, 226, 228)'};
  color: ${(props) => (props.$isClicked ? 'white' : 'black')};
  padding: 5px 12px 5px 12px;
  border-radius: 15px;
  border: none;
  font-size: 16px;
`;
