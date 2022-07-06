import Head from 'next/head';
import Link from 'next/link';
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
      <h1>Frequently Asked Questsions</h1>
      <h2>Getting There</h2>
      <p>
        If you're staying in the{' '}
        <Link href="/stay">rooms we have reserved</Link>, we will have a shuttle
        taking you to and from the venue.
      </p>
      <p>
        If you're going to drive yourself to the venue, the address is
        <br />
        <br />
        545 3rd St
        <br />
        Steamboat Landing
        <br />
        Ithaca, NY 14850-3208
        <br />
        <br />
        Keep going past the Aldi!
      </p>
      <h2>Travel/Lodging</h2>
      <p>
        While there may be some Airbnb options available, this is also Cornell's
        homecoming weekend. Your best bet is to book through the{' '}
        <Link href="/stay">hotel deals</Link> we have available to us!
      </p>
      <h2>Gifts</h2>
      <p>
        We are asking that instead of gifts, please consider donating to one of
        these organizations that are important to us:
        <ul>
          <li>one</li>
          <li>two</li>
        </ul>
      </p>
      <h2>Things To Do</h2>
      <p>
        If you're in town early, check out the{' '}
        <a href="https://ithacamarket.com/" target="_blank" rel="noreferrer">
          farmer's market
        </a>{' '}
        during the day!
        <br />
        Ithaca is Gorges!
      </p>
      <Accordion />
    </StyledInfoPage>
  );
}

export default InfoPage;
