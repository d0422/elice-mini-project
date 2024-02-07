import { ReactNode } from 'react';
import { styled } from 'styled-components';

export function DefaultLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  padding: 24px;

  @media (max-width: 1280px) {
    width: 100%;
  }
  width: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
