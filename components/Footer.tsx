import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

function Footer() {
  return (
    <StyledFooter>
      Made with lots of ☕ Bobby Palko {new Date().getFullYear()}
    </StyledFooter>
  );
}

export default Footer;
