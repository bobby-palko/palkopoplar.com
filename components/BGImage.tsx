import Image from 'next/image';
import styled from 'styled-components';
import wedding08 from '../public/static/wedding-08.jpg';

const StyledBG = styled.div`
  position: relative;

  .magic {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: var(--cream);
    opacity: 0.3;
  }
`;

function BGImage() {
  return (
    <StyledBG>
      <div className="magic" />
      <Image
        src={wedding08}
        alt="Bobby and Erin looking out over the water"
        placeholder="blur"
        priority
      />
    </StyledBG>
  );
}

export default BGImage;
