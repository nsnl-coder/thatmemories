import { IVariant } from '@src/yup/productSchema';
import Variant from './Variant';

interface Props {
  variants: IVariant[] | undefined;
}

function Variants(props: Props): JSX.Element {
  const { variants } = props;

  return (
    <div className="space-y-6">
      {variants?.map((v) => (
        <Variant key={v._id} variant={v} />
      ))}
    </div>
  );
}

export default Variants;
