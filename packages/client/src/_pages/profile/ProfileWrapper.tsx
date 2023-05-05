import RowContainer from '@src/components/container/RowContainer';
import VerifiedUserOnly from '@src/components/hoc/VerifiedUserOnly';
import Tabs from './Tabs';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function ProfileLayout(props: Props): JSX.Element {
  return (
    <VerifiedUserOnly>
      <RowContainer className="py-8">
        <div className="flex gap-x-8">
          <Tabs />
          {props.children}
        </div>
      </RowContainer>
    </VerifiedUserOnly>
  );
}

export default ProfileLayout;
