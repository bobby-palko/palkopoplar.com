import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IGuest, ResultData } from '../types';
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

  h2 {
    font-size: 3rem;
  }

  @keyframes foldOut {
    0% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  justify-items: center;
  gap: 10px;
`;

const StyledClose = styled.button`
  position: sticky;
  float: right;
  left: calc(100% - 6rem);
  top: 2rem;
  border: none;
  background-color: inherit;
  font-size: 3rem;
  cursor: pointer;
`;

interface Props {
  data: {
    name: string;
  };
  onClose: () => void;
}

function Party({ data, onClose }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [message, setMessage] = useState('');

  const JSONdata = useRef(JSON.stringify(data));
  const router = useRouter();

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
      // close the modal and redirect to page with FAQs, directions, etc
      // TODO proper redirection
      router.push('/');
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
    });

    return () => {
      isClosing = true;
    };
  }, [isLoading]);

  if (isLoading) return <HeartLoader />;

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
