import styled from 'styled-components';

const StyledInput = styled.div`
  /* text input styles */
  box-sizing: border-box;
  margin-bottom: 15px;

  &::before,
  &::after {
    box-sizing: border-box;
  }

  --field-padding: 10px;
  position: relative;
  border-top: 28px solid transparent;

  input {
    border: none;
    border-radius: 5px;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--cream);
    padding: var(--field-padding);
    font-size: 1.6rem;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 3px solid var(--hotPink);
  }

  label {
    position: absolute;
    left: var(--field-padding);
    top: 50%;
    transform: translateY(-50%);
    width: calc(100% - (var(--field-padding) * 2));
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--black);
    pointer-events: none;
    transition: top 0.3s ease, font-size 0.3s ease;
  }

  input:valid + label,
  input:focus + label {
    top: -2rem;
    font-size: 1.4rem;
  }

  input[type='text']:focus {
    outline: 1px solid var(--hotPink);
  }

  input[type='password']:focus {
    outline: 1px solid var(--hotPink);
  }
`;

export default StyledInput;
