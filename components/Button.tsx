import { FormEvent } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: var(--pink);
  padding: 10px 15px;
`;

interface Props {
  text: string;
  update(event: FormEvent): void;
}

function Button({ text, update }: Props) {
  const clickHandler = (event: FormEvent) => {
    event.preventDefault();
    update(event);
  };
  return (
    <StyledButton type="button" onClick={clickHandler}>
      {text}
    </StyledButton>
  );
}

export default Button;
