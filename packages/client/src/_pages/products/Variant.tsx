import { useAppSelector } from '@src/hooks/redux';
import { SelectOptionPayload } from '@src/store/currentCartItem';
import { IVariant } from '@thatmemories/yup';
import Option from './Option';

interface Props {
  variant: IVariant;
}

function Variant(props: Props): JSX.Element {
  const { variant } = props;

  const selectedOptions = useAppSelector(
    (state) => state.currentCartItem.selectedOptions,
  );

  const index = selectedOptions.findIndex(
    (option) => option.variantId === variant._id,
  );

  let selectedOption: SelectOptionPayload | undefined;

  if (index !== -1) {
    selectedOption = selectedOptions[index];
  }

  return (
    <div>
      <div className="mb-2 capitalize flex gap-x-1">
        <span className="font-medium">{variant.variantName}:</span>
        <span className="text-text/80">
          {selectedOption ? selectedOption.optionName : 'null'}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {variant.options?.map((option) => (
          <Option key={option._id} option={option} variantId={variant._id!} />
        ))}
      </div>
    </div>
  );
}

export default Variant;
