import RowContainer from '@components/container/RowContainer';
import VerifiedUserOnly from '@components/hoc/VerifiedUserOnly';
import Cards from '@src/_pages/profile/Cards';

function Index(): JSX.Element {
  return (
    <VerifiedUserOnly>
      <RowContainer className="py-8 bg-base-300">
        <Cards />
      </RowContainer>
    </VerifiedUserOnly>
  );
}

export default Index;
