import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  align-items: center;
  font-size: 3.2rem;
`;

function Nav() {
  return (
    <StyledNav>
      <Link href="/">Home</Link>
      <Link href="/stay">Stay</Link>
    </StyledNav>
  );
}

export default Nav;
