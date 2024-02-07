import { CHIPS_ARRAY } from '@/constants/CHIP_TYPE';
import Chip from './Chip';
import styled from 'styled-components';

export default function Filter() {
  return (
    <Wrapper>
      {CHIPS_ARRAY.map((chip) => (
        <Chip key={chip.query} type={chip.query} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
`;
