import { CHIPS, ChipType, ChipValue } from '@/constants/CHIP_TYPE';
import {
  alreadyExistQueryValue,
  updateEachQueryValue,
} from '@/utils/routerQueryString';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

export default function Chip({
  type,
  value,
}: {
  type: ChipType;
  value: ChipValue;
}) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(
    alreadyExistQueryValue(router.query[type], value)
  );

  const handleClick = () => {
    const priceQuery = updateEachQueryValue(
      isClicked,
      router.query.price,
      value
    );

    setIsClicked((prev) => !prev);
    if (priceQuery)
      router.push({
        query: {
          ...router.query,
          price: priceQuery,
        },
      });
    else {
      delete router.query.price;
      router.push(router);
    }
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
