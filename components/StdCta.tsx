// save the date call to action
import Link from 'next/link';
import styled from 'styled-components';

const StyledStdCta = styled.div`
  font-size: 2rem;

  animation: slideIn 750ms ease;

  @keyframes slideIn {
    0% {
      transform: translateX(-500px);
    }
    100% {
      transform: translateX(0);
    }
  }

  h1 {
    font-size: 7.2rem;
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    z-index: 1;
    position: absolute;
    left: 1em;
    top: 7.5em;

    h1 {
      font-size: 5rem;
    }
  }
`;

const StyledLink = styled.a`
  border: none;
  background-color: var(--hotPink);
  padding: 0.33em 2em;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease 250ms;
  font: inherit;
  color: var(--black);
  font-size: 3rem;
  &:hover {
    background-color: var(--pink);
    color: var(--cream);
    text-decoration: none;
  }
`;

function StdCta() {
  return (
    <StyledStdCta>
      <h1>Bobby & Erin are getting married!</h1>
      <p>09.24.2022</p>
      <Link href="/rsvp">
        <StyledLink>RSVP</StyledLink>
      </Link>
    </StyledStdCta>
  );
}

export default StdCta;
