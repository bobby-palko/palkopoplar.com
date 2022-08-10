import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import Button from './Button';
import StyledForm from './StyledForm';
import StyledInput from './StyledInput';

interface UpdateProps {
  target: {
    value: string;
  };
}

function SignInForm() {
  const [username, setUsername] = useState('');

  const updateUsername = (event: UpdateProps) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };
  const [password, setPassword] = useState('');

  const updatePassword = (event: UpdateProps) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const signInHandler = (event: FormEvent) => {
    event.preventDefault();
    signIn('credentials', { username, password });
  };

  return (
    <StyledForm>
      <StyledInput>
        <input
          type="text"
          name="username"
          placeholder="&nbsp;"
          value={username}
          onChange={updateUsername}
          required
        />
        <label htmlFor="username">Username</label>
      </StyledInput>
      <StyledInput>
        <input
          type="password"
          name="password"
          placeholder="&nbsp;"
          value={password}
          onChange={updatePassword}
          required
        />
        <label htmlFor="password">Password</label>
      </StyledInput>
      <Button text="Sign In" update={signInHandler} />
    </StyledForm>
  );
}

export default SignInForm;
