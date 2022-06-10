import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PersonCard from './PersonCard';
import { IGuest, ResultData } from '../types';
import Button from './Button';

const StyledParty = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cream);
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  animation: foldOut 0.5s ease-out;

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
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  position: relative;
  width: 40px;
  height: 60px;
  animation: heartBeat 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  :before,
  :after {
    content: '';
    background: var(--hotPink);
    width: 40px;
    height: 60px;
    border-radius: 50px 50px 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(45deg);
    transform-origin: 50% 68%;
    box-shadow: 5px 4px 5px var(--pink) inset;
  }
  :after {
    transform: rotate(-45deg);
  }
  @keyframes heartBeat {
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;

interface Props {
  data: {
    name: string;
  };
}

function Party({ data }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [message, setMessage] = useState('');

  const JSONdata = useRef(JSON.stringify(data));

  const wait = (amount = 0) =>
    new Promise((resolve) => {
      setTimeout(resolve, amount);
    });

  const update = async (event: FormEvent) => {
    event.preventDefault();

    for (const guest of guests) {
      const attending = document.getElementById(
        `${guest.name}_attending`
      ) as HTMLInputElement;

      if (attending?.value) {
        guest.attending = true;
      }

      const allergies = document.getElementById(
        `${guest.name}_allergies`
      ) as HTMLInputElement;

      if (allergies?.value) {
        guest.allergies = allergies.value;
      }

      console.log(guest);
    }
    await wait(5000);
    console.log('clicked update!');
  };

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

  if (isLoading)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  return (
    <StyledParty>
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
