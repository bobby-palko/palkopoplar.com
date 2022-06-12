import { FormEvent, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: var(--hotPink);
  padding: 10px 0;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  font: inherit;
  color: var(--black);
  font-size: 2rem;
  &:hover {
    background-color: var(--pink);
  }
`;

interface Props {
  text: string;
  update(event: FormEvent): void;
}

function Button({ text, update }: Props) {
  const [btnText, setText] = useState(text);
  const [disabled, setDisabled] = useState(false);

  const clickHandler = (event: FormEvent) => {
    event.preventDefault();
    setDisabled(true);
    setText('Submitting...');
    update(event);
  };
  return (
    <StyledButton type="button" onClick={clickHandler} disabled={disabled}>
      {btnText}
    </StyledButton>
  );
}

export default Button;
