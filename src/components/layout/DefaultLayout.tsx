import { ReactNode } from 'react';
import { styled } from 'styled-components';

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <Layout>{children}</Layout>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  padding: 24px;

  @media (max-width: 1280px) {
    width: 100%;
  }
  width: 1280px;
  background-color: #f0f1f3;
`;
