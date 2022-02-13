import styled from 'styled-components';

const StyledStayPage = styled.div`
  h1 {
    font-size: 7.2rem;
  }

  font-size: 2rem;

  .hotels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 400px));
    align-items: center;
  }
`;

function StayPage() {
  return (
    <StyledStayPage>
      <h1>Where to Stay</h1>
      <p>
        We have blocks of rooms reserved at a couple hotels nearby in Owego, NY:
      </p>
      <div className="hotels">
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
