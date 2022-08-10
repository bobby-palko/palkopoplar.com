import Head from 'next/head';
import styled from 'styled-components';
import Accordion from '../components/Accordion';

const StyledInfoPage = styled.div`
  font-size: 2rem;
  padding: 2rem;

  h1 {
    font-size: 6rem;
    animation: fadeIn 500ms ease-in;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
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
