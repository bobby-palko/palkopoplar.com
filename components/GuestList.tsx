import { Schema } from 'mongoose';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGuest, ResultData } from '../types/types';
import HeartLoader from './HeartLoader';

const StyledDashboard = styled.div`
  font-size: 2.5rem;
  h1 {
    font-size: 7rem;
    text-align: center;
  }
  h2 {
    font-size: 4rem;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  padding: 2em;

  @media (max-width: 550px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: auto;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;

  box-shadow: 1px 1px 5px 0 hsla(0, 0%, 0%, 0.33);

  th {
    background-color: var(--pink);
    color: var(--cream);
  }

  th,
  td {
    padding: 1em;
  }

  th:not(:first-child),
  td:not(:first-child) {
    border-left: 2px solid var(--black);
  }

  tr:nth-child(even) {
    background-color: var(--bgPink);
  }
`;

function GuestList() {
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isClosing = false;
    const fetchData = async () => {
      // call api to search

      const endpoint = '/api/getAllGuests';

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
      setSuccess(false);
      setLoading(false);
      setMessage(`${error as string}`);
    });

    return () => {
      isClosing = true;
    };
  }, [isLoading]);

  if (isLoading) return <HeartLoader />;

  if (!success) {
    return (
      <>
        <h1>Something Went Wrong!</h1>
        <h2>{message}</h2>
      </>
    );
  }

  const partnerName = (id: Schema.Types.ObjectId | undefined) => {
    if (!id) return 'Unknown';
    const partner = guests.find((guest) => guest._id === id);
    return partner ? partner.name : 'Unknown';
  };

  const attending = guests.filter((guest) => guest.attending);
  const notAttending = guests.filter(
    (guest) => !guest.attending && guest.rsvpd
  );

  return (
    <StyledDashboard>
      <h1>Guests!</h1>
      <StyledGrid>
        {!!attending.length && (
          <div>
            <h2>Attending: {attending.length}</h2>
            <StyledTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Allergies</th>
                </tr>
              </thead>
              <tbody>
                {attending.map((guest) => (
                  <tr key={guest.name}>
                    <td>
                      {guest.name}{' '}
                      {guest.nameIsEditable &&
                        ` - ${partnerName(guest.partnerId)}`}
                    </td>
                    <td>{guest.allergies}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </div>
        )}
        {!!notAttending.length && (
          <div>
            <h2>Not Attending: {notAttending.length}</h2>
            <StyledTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {notAttending.map((guest) => (
                  <tr key={guest.name}>
                    <td>
                      {guest.name}{' '}
                      {guest.nameIsEditable &&
                        ` - ${partnerName(guest.partnerId)}`}
                    </td>
                    <td>{guest.allergies}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </div>
        )}
      </StyledGrid>
    </StyledDashboard>
  );
}

export default GuestList;
