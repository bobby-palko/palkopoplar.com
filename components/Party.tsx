import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { IGuest, ResultData } from '../types/types';
import PersonCard from './PersonCard';
import Button from './Button';
import HeartLoader from './HeartLoader';

const StyledParty = styled.div`
  background-color: var(--cream);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  animation: foldOut 0.5s ease-out;

  @media screen and (max-width: 500px) {
    overflow-x: hidden;
    overscroll-behavior-x: none;
  }

  h2 {
    margin-top: 2em;
    font-size: 3rem;
    @media screen and (max-width: 500px) {
      margin-top: 4rem;
    }
  }

  @keyframes foldOut {
    0% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  .info {
    font-size: 2rem;
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  justify-items: center;
  gap: 10px;
`;

const StyledClose = styled.button`
  position: absolute;
  float: right;
  left: calc(100% - 6rem);
  top: 2rem;
  border: none;
  background-color: transparent;
  font-size: 3rem;
  color: var(--black);
  cursor: pointer;
  @media screen and (max-width: 500px) {
    position: absolute;
    font-size: 4rem;
    left: calc(100% - 2.5em);
    top: 0;
  }
`;

interface Props {
  data: {
    name: string;
  };
  onClose: () => void;
}

function Party({ data, onClose }: Props) {
  // there's probably a better way than all these states but eh
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [message, setMessage] = useState('');
  const [hasSubmitted, setSubmitted] = useState(false);

  const JSONdata = useRef(JSON.stringify(data));

  /*
   * RSVPs a guest, including if they are attending
   * or have any allergies/things we should know.
   */
  const update = async (event: FormEvent) => {
    event.preventDefault();
    // update the guest objects we currently have
    for (const guest of guests) {
      // they've RSVP'd by clicking the update button
      guest.rsvpd = true;

      // grab attending status
      const attending = document.getElementById(
        `${guest.name}_attending`
      ) as HTMLInputElement;

      // box is checked, they're attending
      guest.attending = !!attending?.value;

      // any allergies?
      const allergies = document.getElementById(
        `${guest.name}_allergies`
      ) as HTMLInputElement;

      // if they removed any prior notes that may have existed
      // return to an empty string value
      guest.allergies = allergies.value || '';

      // if its a guest, update the name
      if (guest.nameIsEditable) {
        const newName = document.getElementById(
          'name-edit'
        ) as HTMLInputElement;

        // fall back to 'Guest' if no name provided
        guest.name = newName.value || 'Guest';
      }
    }

    const updatedGuests = JSON.stringify({ guests: [...guests] });

    // update guests in the DB
    const endpoint = 'api/updateGuest';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: updatedGuests,
    };

    // get results
    const response = await fetch(endpoint, options);
    const result = (await response.json()) as ResultData;

    if (result.success) {
      setMessage('We got your RSVP!');
      setSuccess(false); // so we only show the message
      setSubmitted(true);
    }
  };

  /*
   * Search for name entered in previous form
   */
  useEffect(() => {
    let isClosing = false;
    const fetchData = async () => {
      // call api to search

      const endpoint = '/api/search';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata.current,
      };

      // get results
      const response = await fetch(endpoint, options);
      const result = (await response.json()) as ResultData;

      if (!isClosing) {
        if (result.success && result.party) {
          setGuests(result.party);
        }
        setSuccess(result.success);
        setMessage(result.message);
        setLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.log(error);
      setMessage(
        `Something went wrong! Please try again.
If this continues please let Bobby know: 
${error as string}`
      );
      setSuccess(false);
      setLoading(false);
    });

    return () => {
      isClosing = true;
    };
  }, [isLoading]);

  if (isLoading) return <HeartLoader />;

  if (hasSubmitted) {
    return (
      <StyledParty>
        <h2>{message}</h2>
        <p className="info">
          Check out some more <Link href="/info">info about the day!</Link>
        </p>
      </StyledParty>
    );
  }

  return (
    <StyledParty>
      <StyledClose type="button" onClick={onClose}>
        &times;
      </StyledClose>
      <h2>{message}</h2>
      {success && (
        <StyledForm>
          {guests.map((guest) => (
            <PersonCard key={guest.name} guest={guest} />
          ))}
          <Button text="Update" update={update} />
        </StyledForm>
      )}
    </StyledParty>
  );
}

export default Party;
