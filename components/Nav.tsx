import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.div`
  display: flex;
  font-size: 3.2rem;
  justify-content: space-evenly;
`;

function Nav() {
  return (
    <StyledNav>
      <Link href="/">Home</Link>
      <Link href="/stay">Stay</Link>
      <Link href="/rsvp">RSVP</Link>
    </StyledNav>
  );
}

export default Nav;
