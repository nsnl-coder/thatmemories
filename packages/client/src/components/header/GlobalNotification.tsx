import Link from 'next/link';

function GlobalNotification(): JSX.Element {
  return (
    <div className="bg-neutral text-white text-p2">
      <p className="text-center py-2 px-4">
        SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL DELIVERY -
        OFF 50%!
        <Link href="/" className="font-semibold ml-1">
          SHOP NOW
        </Link>
      </p>
    </div>
  );
}

export default GlobalNotification;
