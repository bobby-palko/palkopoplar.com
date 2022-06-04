import Head from 'next/head';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Party from '../components/Party';
import { RSVPForm } from '../types';

Modal.setAppElement('#modal');

const ModalOverlay = {
  overlay: {
    backgroundColor: `rgba(0,0,0,0.5)`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  content: {
    backgroundColor: `var(--cream)`,
    border: `none`,
    borderRadius: `7%`,
    padding: `0`,
    inset: `10% 25%`,
  },
};

const blankForm: RSVPForm = {
  name: '',
};

function RSVPPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [submittedForm, hasSubmittedForm] = useState(false);
  const [formData, setFormData] = useState(blankForm);

  interface UpdateNameProps {
    target: {
      value: string;
    };
  }

  const updateName = ({ target: { value } }: UpdateNameProps) => {
    setName(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // prevent navigating to api/ and refreshing
    event.preventDefault();

    // grab data from form
    const data: RSVPForm = {
      name,
    };
    setFormData(data);
    hasSubmittedForm(true);
  };

  const handleClose = () => {
    router.push('/rsvp');
    hasSubmittedForm(false);
    setFormData(blankForm);
  };

  return (
    <>
      <Head>
        <title>RSVP</title>
      </Head>

      <div id="modal">
        <Modal
          isOpen={submittedForm}
          onRequestClose={handleClose}
          contentLabel="Party modal"
          style={ModalOverlay}
        >
          <Party data={formData} />
        </Modal>
      </div>

      <h1>Let us know if you can make it!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Enter your name as shown on your invitation:{' '}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={updateName}
          value={name}
          required
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default RSVPPage;
