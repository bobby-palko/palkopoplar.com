import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/static/logo.png';

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src={logo} alt="to home page" height="100" width="300" />
      </a>
    </Link>
  );
}

export default Logo;
