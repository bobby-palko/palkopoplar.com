import Head from 'next/head';
// import Link from 'next/link';
import styled from 'styled-components';
import Accordion from '../components/Accordion';

const StyledInfoPage = styled.div`
  font-size: 2rem;

  h1 {
    font-size: 6rem;
  }

  h2 {
    font-size: 4rem;
  }
`;

function InfoPage() {
  return (
    <StyledInfoPage>
      <Head>
        <title>Info</title>
      </Head>
      <h1>Frequently Asked Questions</h1>
      <Accordion />
    </StyledInfoPage>
  );
}

export default InfoPage;
