import Head from 'next/head';
import styled from 'styled-components';
import Hero from '../components/Hero';
import StdCta from '../components/StdCta';

const StyledHomePage = styled.div`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr minmax(300px, 2fr);
  align-items: center;
  @media (max-width: 800px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    .first {
      order: -1;
    }
    .cta {
      margin-top: -5rem;
      text-align: center;
    }
  }
`;

function HomePage() {
  return (
    <StyledHomePage>
      <Head>
        <title>We're getting married!</title>
      </Head>
      <div className="cta">
        <StdCta />
      </div>
      <div className="first">
        <Hero />
      </div>
    </StyledHomePage>
  );
}

export default HomePage;
