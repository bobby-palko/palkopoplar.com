import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import Party from '../components/Party';
import { StyledModal } from '../components/ModalAdapter';
import { RSVPSearchForm } from '../types/types';
import BGImage from '../components/BGImage';
import StyledForm from '../components/StyledForm';
import StyledInput from '../components/StyledInput';

const StyledRSVPPage = styled.div`
  position: relative;

  .rsvp-form {
    position: absolute;
    z-index: 10;
    top: 33%;
    left: 25vw;
    right: 25vw;
    /* max-width: 400px; */
    animation: fadeIn 500ms ease-in;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    h1 {
      font-size: 5rem;
      text-align: center;
    }
  }

  @media (max-width: 750px) {
    .rsvp-form {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      padding: 0 4em;
      margin-bottom: -2em;

      h1 {
        font-size: 3rem;
      }
    }
  }
`;

const StyledButton = styled.button`
  border: none;
  background-color: var(--hotPink);
  padding: 10px 0;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  font: inherit;
  font-size: 2.2rem;
  color: var(--black);
  box-shadow: 1px 1px 5px 0 hsla(0, 0%, 0%, 0.33);
  &:hover {
    background-color: var(--pink);
  }
`;

const blankForm: RSVPSearchForm = {
  name: '',
};

function RSVPPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [submittedForm, hasSubmittedForm] = useState(false);
  const [formData, setFormData] = useState(blankForm);

  ReactModal.setAppElement('#__next');

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
    const data: RSVPSearchForm = {
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
    <StyledRSVPPage>
      <Head>
        <title>RSVP</title>
      </Head>

      <StyledModal
        isOpen={submittedForm}
        onRequestClose={handleClose}
        contentLabel="Party modal"
      >
        <Party data={formData} onClose={handleClose} />
      </StyledModal>
      <div className="rsvp-form">
        <h1>Let us know if you can make it!</h1>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput>
            <input
              id="name"
              name="name"
              type="text"
              onChange={updateName}
              value={name}
              required
            />
            <label htmlFor="name">
              Enter your name as shown on your invitation
            </label>
          </StyledInput>
          <StyledButton type="submit">Search</StyledButton>
        </StyledForm>
      </div>
      <BGImage />
    </StyledRSVPPage>
  );
}

export default RSVPPage;
