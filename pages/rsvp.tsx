import Head from 'next/head';
import Modal from 'react-modal';
import { FormEvent } from 'react';

function RSVPPage() {
  const handleSubmit = async (event: FormEvent) => {
    // prevent navigating to api/ and refreshing
    event.preventDefault();

    // grab data
    const data = {
      name: event.target.name.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = '/api/rsvp';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    alert(`Is this your name? ${result.data}`);
  };
  return (
    <>
      <Head>
        <title>RSVP</title>
      </Head>
      <h1>Let us know if you can make it!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Enter your name as shown on your invitation:
        </label>
        <input id="name" name="name" type="text" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default RSVPPage;
