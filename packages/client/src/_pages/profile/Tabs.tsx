import routesConfig from '@src/config/routesConfig';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

function Tabs(): JSX.Element {
  return (
    <div className="w-60 border self-start rounded-md overflow-hidden">
      <div className="divide-y">
        <Link
          className="px-4 py-3 flex items-center gap-x-3"
          href={routesConfig.profile.orders}
        >
          <span>
            <FaUser />
          </span>
          <span>Account detail</span>
        </Link>
        <Link className="block px-4 py-3" href={routesConfig.profile.orders}>
          Orders
        </Link>
        <Link className="block px-4 py-3" href={routesConfig.profile.orders}>
          Wishlish
        </Link>
        <Link className="block px-4 py-3" href={routesConfig.profile.orders}>
          Contact support
        </Link>
        <Link className="block px-4 py-3" href={routesConfig.profile.orders}>
          Log out
        </Link>
      </div>
    </div>
  );
}

export default Tabs;
