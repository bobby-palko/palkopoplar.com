import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { IGuest } from '../types/types';

const StyledPersonCard = styled.div`
  background-color: var(--bgPink);
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--black);

  /* greeting */
  h3 {
    text-align: center;
    font-size: 2.5rem;
  }
`;

const StyledPerson = styled.div`
  div {
    padding: 10px 5px;
    display: grid;
    margin: 20px 0;
    font-size: 1.8rem;
  }
  label {
    padding-right: 3px;
    @media screen and (max-width: 500px) {
      font-size: 2.2rem;
    }
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
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    @media screen and (max-width: 500px) {
      width: 6em;
      height: 3em;
    }
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
    @media screen and (max-width: 500px) {
      width: 3em;
      height: 3em;
    }
  }

  input[type='checkbox']:checked:after {
    left: calc(100% - 1.5em);
    @media screen and (max-width: 500px) {
      left: calc(100% - 3em);
    }
  }

  /* text input styles */
  div.allergies,
  div.allergies::before,
  div.allergies::after {
    box-sizing: border-box;
  }

  div.allergies {
    display: initial;
    position: relative;
    border-top: 28px solid transparent;
    --field-padding: 12px;
  }

  div.allergies input {
    border: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--cream);
    border-radius: 3px;
    padding: var(--field-padding);
    font-size: 1.6rem;
    width: 250px;
  }

  label.allergies {
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
    transition: top 0.3s ease, color 0.3s ease, font-size 0.3s ease;
  }

  div.allergies input:not(:placeholder-shown) + label.allergies,
  div.allergies input:focus + label.allergies {
    top: -10px;
    font-size: 1.6rem;
    color: var(--black);
  }

  input[type='text']:focus {
    outline: 2px solid var(--hotPink);
  }
`;

interface Props {
  guest: IGuest;
}

function PersonCard({ guest }: Props) {
  const [attending, setAttending] = useState(guest.attending);
  const updateAttending = () => {
    setAttending(!attending);
  };

  const [allergies, setAllergies] = useState(guest.allergies);
  const updateAllergies = (event: FormEvent<HTMLInputElement>) => {
    setAllergies(event.currentTarget.value);
  };

  return (
    <StyledPersonCard>
      <h3>{guest.name}</h3>
      <StyledPerson>
        {guest.nameIsEditable && (
          <div className="allergies">
            <input
              className="allergies"
              name="name-edit"
              type="text"
              id="name-edit"
              placeholder={guest.name === 'Guest' ? ' ' : ''}
              value={guest.name === 'Guest' ? '' : guest.name}
            />
            <label className="allergies" htmlFor="name-edit">
              Name of this Guest
            </label>
          </div>
        )}
        <div className="attending">
          <label htmlFor="attending">Attending</label>
          <input
            type="checkbox"
            name="attending"
            className="attending"
            id={`${guest.name}_attending`}
            onChange={updateAttending}
            checked={attending}
            value={`${attending ? 'attending' : ''}`}
          />
        </div>
        <div className="allergies">
          <input
            type="text"
            name="allergies"
            className="allergies"
            placeholder="&nbsp;"
            id={`${guest.name}_allergies`}
            value={allergies}
            onChange={updateAllergies}
          />
          <label htmlFor="allergies" className="allergies">
            Notes/Allergies
          </label>
        </div>
      </StyledPerson>
    </StyledPersonCard>
  );
}

export default PersonCard;
