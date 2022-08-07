import { useSession, signOut } from 'next-auth/react';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import GuestList from '../components/GuestList';
import SignInForm from '../components/SignInForm';

const StyledDashboardPage = styled.div`
  a {
    text-align: center;
    margin-top: 5em;
    font-size: 2rem;
    border: none;
    background-color: var(--hotPink);
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    font: inherit;
    font-size: 2.2rem;
    color: var(--black);
    box-shadow: 1px 1px 5px 0 hsla(0, 0%, 0%, 0.33);
    &:hover {
      color: var(--black);
      background-color: var(--pink);
      text-decoration: none;
    }
  }
`;

function DashboardPage() {
  const { data: session } = useSession();

  const signOutHandler = (event: MouseEvent) => {
    event.preventDefault();
    signOut();
  };

  if (session) {
    return (
      <StyledDashboardPage>
        <GuestList />
        <a href="/api/auth/signout" onClick={signOutHandler}>
          Sign Out
        </a>
      </StyledDashboardPage>
    );
  }

  // sign in form
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm />
    </>
  );
}

export default DashboardPage;
