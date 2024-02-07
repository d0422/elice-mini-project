import { CHIPS } from '@/constants/CHIP_TYPE';
import Chip from './Chip';
import styled from 'styled-components';

export default function Filter() {
  const PRICE_CHIPS_ARRAY = Object.values(CHIPS.price);
  return (
    <Wrapper>
      {PRICE_CHIPS_ARRAY.map((chip) => (
        <Chip key={chip.value} type="price" value={chip.value} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  gap: 4px;
`;
