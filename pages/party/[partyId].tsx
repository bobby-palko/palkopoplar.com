import { useRouter } from 'next/router';
import Party from '../../components/Party';

const PartyPage = () => {
  const router = useRouter();
  const { partyId } = router.query;

  return <Party id={partyId} pathname={router.pathname} />;
};

export default PartyPage;
