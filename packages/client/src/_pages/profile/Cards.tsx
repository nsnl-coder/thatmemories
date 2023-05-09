import { AiFillHeart, AiTwotoneSecurityScan } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { HiDocumentSearch } from 'react-icons/hi';
import { RiLogoutCircleFill } from 'react-icons/ri';
import Card from './Card';
import ChangeAdressModal from './ChangeAdressModal';

function Tabs(): JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Card
        title="your orders"
        description="Track, return cancel an order, download invoice or buy again"
        href="/orders"
      >
        <HiDocumentSearch size={36} />
      </Card>
      <ChangeAdressModal />
      <Card
        title="login & security"
        description="Edit email, password and name"
        href="/profile/orders"
      >
        <AiTwotoneSecurityScan size={32} />
      </Card>
      <Card
        title="Contact support"
        description="Track, return cancel an order, download invoice or buy again"
        href="/profile/orders"
      >
        <BiSupport size={32} />
      </Card>
      <Card
        title="your wishlist"
        description="Track, return cancel an order, download invoice or buy again"
        href="/profile/orders"
      >
        <AiFillHeart size={32} />
      </Card>
      <Card
        title="Log out"
        description="Click here to logout."
        href="/profile/orders"
      >
        <RiLogoutCircleFill size={32} />
      </Card>
    </div>
  );
}

export default Tabs;
