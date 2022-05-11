import styled from 'styled-components';

const StyledParty = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--pink);
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Party({ id, pathname }) {
  return (
    <StyledParty>
      I am the party {id}; my pathname is: {pathname}
    </StyledParty>
  );
}

export default Party;
