import Image from 'next/image';
import styled from 'styled-components';
import wedding03 from '../public/static/wedding-03.jpg';

const StyledBG = styled.div`
  position: relative;

  .magic {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: var(--cream);
    opacity: 0.5;
  }

  @media screen and (max-width: 750px) {
    .magic {
      opacity: 0.2;
    }
  }
`;

function BGImage() {
  return (
    <StyledBG>
      <div className="magic" />
      <Image
        src={wedding03}
        alt="Bobby and Erin looking at each other"
        placeholder="blur"
        priority
      />
    </StyledBG>
  );
}

export default BGImage;
