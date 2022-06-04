import styled from 'styled-components';
import { IGuest } from '../types';

const StyledPersonCard = styled.div`
  background-color: var(--bgPink);
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--black);

  /* greeting */
  h3 {
    text-align: center;
  }
`;

const StyledForm = styled.form`
  div {
    padding: 10px 5px;
    display: grid;
  }
  label {
    padding: 0 3px 0 0;
  }
  /* checkbox styles */
  div.attending {
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
  }

  input[type='checkbox'] {
    justify-self: end;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    width: 3em;
    height: 1.5em;
    background: var(--cream);
    border-radius: 3em;
    position: relative;
    cursor: pointer;
    /* outline: none; */
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  input[type='checkbox']:checked {
    background: var(--green);
  }

  input[type='checkbox']:after {
    position: absolute;
    content: '';
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: var(--hotPink);
    -webkit-box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    left: 0;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  input[type='checkbox']:checked:after {
    left: calc(100% - 1.5em);
  }

  /* text input styles */
  div.allergies {
    display: initial;
    box-sizing: border-box;
    position: relative;
    --field-padding: 12px;
    border-top: 20px solid transparent;
  }

  div.allergies input[type='text']:focus + label.allergies {
    top: -10px;
    font-size: 10px;
    color: var(--black);
  }

  input[type='text'] {
    border: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--cream);
    border: 1px solid var(--cream);
    border-radius: 3px;
    padding: var(--field-padding);
  }
  input[type='text']:focus {
    outline: none;
    background-color: var(--cream);
    border: 2px solid var(--hotPink);
    margin: -1px;
  }
  label.allergies {
    position: absolute;
    left: var(--field-padding);
    bottom: 50%;
    transform: translateY(-50%);
    width: calc(100% - (var(--field-padding) * 2));
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

interface Props {
  guest: IGuest;
}

function PersonCard({ guest }: Props) {
  return (
    <StyledPersonCard>
      <h3>Hi {guest.name}!</h3>
      <StyledForm>
        <div className="attending">
          <label htmlFor="attending">Attending</label>
          <input type="checkbox" name="attending" className="attending" />
        </div>
        <div className="allergies">
          <input type="text" name="allergies" className="allergies" />
          <label htmlFor="allergies" className="allergies">
            Notes/Allergies
          </label>
        </div>
      </StyledForm>
    </StyledPersonCard>
  );
}

export default PersonCard;
