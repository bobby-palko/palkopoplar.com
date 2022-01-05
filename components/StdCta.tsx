// save the date call to action
import Link from 'next/link';
import styled from 'styled-components';

const StyledStdCta = styled.div`
  h1 {
    font-size: 7.2rem;
  }
  font-size: 2rem;
`;

function StdCta() {
  return (
    <StyledStdCta>
      <h1>Save the Date!</h1>
      <p>
        September 24th, 2022
        <br />
        Ithica Farmer's Market, Ithica, NY
        <br />
        Already know you're coming?{' '}
        <Link href="/stay">Book your stay now!</Link>
      </p>
    </StyledStdCta>
  );
}

export default StdCta;
