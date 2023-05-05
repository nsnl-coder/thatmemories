import BuyAgain from '@src/_pages/profile/BuyAgain';
import OrdersTable from '@src/_pages/profile/OrdersTable';
import RowContainer from '@src/components/container/RowContainer';
import VerifiedUserOnly from '@src/components/hoc/VerifiedUserOnly';

function Orders(): JSX.Element {
  return (
    <VerifiedUserOnly>
      <RowContainer className="py-8">
        <div className="flex">
          <OrdersTable />
          <BuyAgain />
        </div>
      </RowContainer>
    </VerifiedUserOnly>
  );
}

export default Orders;
