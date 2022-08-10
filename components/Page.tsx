import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'AfternoonCoffee';
    src: url('/static/AfternoonCoffee.ttf');
    font-weight: normal;
    font-style: normal;
  }
  :root {
    --white: rgba(248,250,249,1);
    --black: rgba(0,0,0,1);
    --cream: rgba(254,245,226,1);
    --green: rgba(104,139,15,1);
    --pink: rgba(219,39,106,1);
    --hotPink: rgba(255,81,185,1);
    --bgPink: rgba(219,39,106,0.5);
    --maxWidth: 1200px;
  }
  html {
    background-color: var(--cream);
    color: var(--black);
    font-size: 10px;
  }
  body {
    font-family: 'AfternoonCoffee', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.6rem;
    word-spacing: 0.2em;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: var(--hotPink);
  }
  a:hover {
    text-decoration: underline;
    color: var(--pink);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
`;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyles />
      <PageWrapper>
        <Header />
        <InnerStyles>{children}</InnerStyles>
        <Footer />
      </PageWrapper>
    </>
  );
}

export default Page;
