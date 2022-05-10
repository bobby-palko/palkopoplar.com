import Head from 'next/head';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import Party from '../components/Party';

Modal.setAppElement('#modal');

const ModalOverlay = {
  overlay: {
    backgroundColor: `rgba(0,0,0,0.5)`,
  },
  content: {
    backgroundColor: `red`,
  },
};

function RSVPPage() {
  const router = useRouter();

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

    router.push(
      {
        pathname: '/rsvp',
        query: {
          partyId: result.partyId,
        },
      },
      '/rsvp'
    );
  };

  return (
    <>
      <Head>
        <title>RSVP</title>
      </Head>

      <div id="modal">
        <Modal
          isOpen={!!router.query.partyId}
          onRequestClose={() => router.push('/rsvp')}
          contentLabel="Party modal"
          style={ModalOverlay}
        >
          <Party id={router.query.partyId} pathname={router.pathname} />
        </Modal>
      </div>

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
