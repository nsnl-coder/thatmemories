import Link from 'next/link';
import RowContainer from '../container/RowContainer';

function SubHeader(): JSX.Element {
  return (
    <RowContainer className="hidden lg:block">
      <div className="flex py-3 justify-between text-p2">
        <div className="flex gap-x-4">
          <ul>
            <li>facebook</li>
          </ul>
          <div>
            Free Shipping World wide for all orders over $199.
            <Link href="/" className="text-primary ml-1 font-semibold">
              Click and Shop Now.
            </Link>
          </div>
        </div>
        <div>
          <Link href="/">Order tracking</Link>
        </div>
      </div>
    </RowContainer>
  );
}

export default SubHeader;
