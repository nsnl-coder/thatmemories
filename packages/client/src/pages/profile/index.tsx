import RowContainer from '@components/container/RowContainer';
import LoggedInUserOnly from '@components/hoc/LoggedInUserOnly';

function Index(): JSX.Element {
  return (
    <LoggedInUserOnly>
      <RowContainer>
        <h1> index </h1>
      </RowContainer>
    </LoggedInUserOnly>
  );
}

export default Index;
