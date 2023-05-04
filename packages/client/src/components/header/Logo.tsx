import Image from 'next/image';
import Link from 'next/link';

function Logo(): JSX.Element {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        width={332}
        height={74}
        alt="site logo"
        className="w-28 object-contain"
      />
    </Link>
  );
}

export default Logo;
