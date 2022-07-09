import Image from 'next/image';
import styled from 'styled-components';
import wedding01 from '../public/static/wedding-01.jpg';

const StyledHero = styled.div`
  margin: 0;
  padding: 0;
  max-width: 600px;
  position: relative;
  clip-path: circle(50% at 75% 50%);

  animation: fadeIn 500ms ease-in;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    .magic {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 1;
      background-color: var(--cream);
      opacity: 0.3;
    }
  }

  @media (min-width: 750px) {
    clip-path: circle(33%);
    z-index: -1;
    .magic {
      z-index: -1;
    }
  }
`;

function HeroImage() {
  return (
    <StyledHero>
      <div className="magic" />
      <Image
        src={wedding01}
        alt="Erin point to her ring emphatically"
        placeholder="blur"
        priority
      />
    </StyledHero>
  );
}

export default HeroImage;
