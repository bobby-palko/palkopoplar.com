import Head from 'next/head';
import styled from 'styled-components';

const StyledStayPage = styled.div`
  padding: 4rem;
  font-size: 2rem;
  animation: fadeIn 500ms ease-in;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  h1 {
    font-size: 7.2rem;
  }

  .hotels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
    align-items: center;
    justify-content: center;
    animation: foldOut 1s ease-out;

    > div {
      background-color: var(--bgPink);
      display: inline-block;
      padding: 2rem 1.5rem;
      margin: 1rem;
      border-radius: 0.5em;
      border: solid 1px var(--black);
      justify-self: center;
    }

    a {
      color: var(--cream);
    }

    @keyframes foldOut {
      0%,
      50% {
        transform: rotateY(90deg);
      }
      100% {
        transform: rotateY(0deg);
      }
    }
  }
`;

function StayPage() {
  return (
    <StyledStayPage>
      <Head>
        <title>Lodging</title>
      </Head>
      <h1>Where to Stay</h1>
      <p>
        We have blocks of rooms reserved at a couple hotels nearby in Owego, NY:
      </p>
      <div className="hotels">
        <div>
          <p>
            <a
              href="https://www.hilton.com/en/hotels/bgmowhx-hampton-owego/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Hampton Inn
            </a>{' '}
            - $149
            <br />
            1030 Route 17C
            <br />
            Owego, New York, 13827
            <br />
            <a href="tel:+16076874600">607-687-4600</a>
          </p>
        </div>
        <div>
          <p>
            <a
              href="https://www.bestwestern.com/en_US/book/hotels-in-owego/best-western-owego-inn/propertyCode.33196.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              Best Western
            </a>{' '}
            - $109
            <br />
            20 Hickories Park Road
            <br />
            Owego, New York, 13827
            <br />
            <a href="tel:+16076879000">607-687-9000</a>
          </p>
        </div>
      </div>
      <p>
        These rates are good until August 23rd. We'll also have a shuttle to
        take you to and from the wedding venue. Feel free to book now if you're
        sure you'll be coming!
      </p>
      <p>
        Since this is also Cornell's homecoming weekend, we suggest booking ASAP
        regardless of where you're staying. We can't wait to share this special
        day with all of you!
      </p>
    </StyledStayPage>
  );
}

export default StayPage;
