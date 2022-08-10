import Head from 'next/head';
import styled from 'styled-components';
import HeroImage from '../components/HeroImage';
import StdCta from '../components/StdCta';

const StyledHomePage = styled.div`
  margin: 0;
  padding-left: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 750px) {
    margin-top: -15%;
  }
`;

function HomePage() {
  return (
    <StyledHomePage>
      <Head>
        <title>We're getting married!</title>
      </Head>
      <StdCta />
      <HeroImage />
    </StyledHomePage>
  );
}

export default HomePage;
