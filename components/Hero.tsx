import Image from 'next/image';
import styled from 'styled-components';
import calendar from '../public/static/calendar.png';

const StyledHero = styled.div`
  min-width: 200px;
`;

function Hero() {
  return (
    <StyledHero>
      <Image
        src={calendar}
        alt="Wedding day September 24th"
        placeholder="blur"
        priority
      />
    </StyledHero>
  );
}

export default Hero;
