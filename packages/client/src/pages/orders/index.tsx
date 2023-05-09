import BuyAgain from '@src/_pages/profile/BuyAgain';
import OrdersTable from '@src/_pages/profile/OrdersTable';
import RowContainer from '@src/components/container/RowContainer';
import VerifiedUserOnly from '@src/components/hoc/VerifiedUserOnly';

function Orders(): JSX.Element {
  return (
    <VerifiedUserOnly>
      <RowContainer className="py-8 bg-base-300">
        <div className="flex gap-x-10">
          <OrdersTable />
          <BuyAgain />
        </div>
      </RowContainer>
    </VerifiedUserOnly>
  );
}

export default Orders;
