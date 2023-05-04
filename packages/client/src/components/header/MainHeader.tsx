import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBag, BsPerson } from 'react-icons/bs';
import { HiBars3 } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
//
import RowContainer from '../container/RowContainer';
import Logo from './Logo';
import NavBar from './NavBar';

import { useAppSelector } from '@src/hooks/redux';

import useLogOut from '@react-query/auth/useLogOut';

function MainHeader(): JSX.Element {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { logout } = useLogOut();

  const cartItemsLength = useAppSelector((state) => state.cart.items.length);

  return (
    <RowContainer className="border-y">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <label htmlFor="side-drawer" className="cursor-pointer">
            <HiBars3 size={28} />
          </label>
          <Logo />
          <div className="hidden lg:block">
            <NavBar layout="horizontal" />
          </div>
        </div>
        <div className="flex items-center gap-x-4 py-6">
          <Link
            href={
              !isLoggedIn
                ? '/auth/login'
                : user?.isVerified
                ? '/profile'
                : '/auth/verify-email'
            }
          >
            <BsPerson size={24} />
          </Link>
          <Link href="/">
            <IoIosSearch size={24} />
          </Link>
          <Link href="/">
            <AiOutlineHeart size={24} />
          </Link>
          <span>$0.00</span>
          <Link href="/cart" className="indicator">
            <span className="indicator-item badge badge-primary text-white">
              {cartItemsLength}
            </span>
            <BsBag size={21} />
          </Link>
          {isLoggedIn && (
            <button
              type="button"
              className="text-blue-600 underline hover:text-blue-700"
              onClick={() => logout()}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </RowContainer>
  );
}

export default MainHeader;
