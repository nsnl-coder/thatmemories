import RowContainer from '@components/container/RowContainer';
import VerifiedUserOnly from '@components/hoc/VerifiedUserOnly';
import OrdersTable from '@src/_pages/profile/OrdersTable';
import Tabs from '@src/_pages/profile/Tabs';

function Index(): JSX.Element {
  return (
    <VerifiedUserOnly>
      <RowContainer className="py-8">
        <div className="flex gap-x-8">
          <Tabs />
          <OrdersTable />
        </div>
      </RowContainer>
    </VerifiedUserOnly>
  );
}

export default Index;
