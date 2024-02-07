import { CHIPS, ChipType } from '@/constants/CHIP_TYPE';
import { updateEachQuery } from '@/utils/rouiterQueryString';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

export default function Chip({ type }: { type: ChipType }) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    const priceQuery = updateEachQuery(
      isClicked,
      router.query.price,
      CHIPS[type].query
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
    <ChipWrapper onClick={handleClick} isClicked={isClicked}>
      <div>{CHIPS[type].title}</div>
    </ChipWrapper>
  );
}

const ChipWrapper = styled.button<{ isClicked: boolean }>`
  background-color: ${(props) =>
    props.isClicked ? 'rgb(66, 63, 140)' : 'rgb(225, 226, 228)'};
  color: ${(props) => (props.isClicked ? 'white' : 'black')};
  padding: 5px 12px 5px 12px;
  border-radius: 15px;
  border: none;
  font-size: 16px;
`;
