import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Party from '../components/Party';
import { StyledModal } from '../components/ModalAdapter';
import { RSVPSearchForm } from '../types';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.div`
  /* text input styles */
  box-sizing: border-box;
  margin-bottom: 15px;

  &::before,
  &::after {
    box-sizing: border-box;
  }

  --field-padding: 10px;
  position: relative;
  border-top: 28px solid transparent;

  input {
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: var(--cream);
    padding: var(--field-padding);
    font-size: 1.6rem;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 3px solid var(--hotPink);
  }

  label {
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
    transition: top 0.3s ease, font-size 0.3s ease;
  }

  input:valid + label,
  input:focus + label {
    top: -2rem;
    font-size: 1.4rem;
  }

  input[type='text']:focus {
    outline: 1px solid var(--hotPink);
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
  font-size: 2rem;
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
    <>
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
    </>
  );
}

export default RSVPPage;
