import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { MdPlaylistAdd } from 'react-icons/md';
import Variant from './Variant';

import { DRAG_TYPES } from '@src/types/enum';
import { IProduct } from '@src/yup/productSchema';

import Label, { LabelProps } from '@components/form/Label';
import SwapWrapper from '@components/swapWrapper/SwapWrapper';

interface Props extends LabelProps {
  control: Control<IProduct>;
  register: UseFormRegister<IProduct>;
}

function VariantsInput(props: Props): JSX.Element {
  const { control, register, fieldName, labelTheme, label } = props;
  const {
    fields: variants,
    append,
    remove,
    swap,
  } = useFieldArray({
    control,
    name: 'variants',
  });

  return (
    <div>
      <Label fieldName={fieldName} labelTheme={labelTheme} label={label} />
      <div className="flex flex-col gap-y-12">
        {variants.map((variant, index) => (
          <SwapWrapper
            itemType={DRAG_TYPES.VARIANT}
            swapByIndex={swap}
            isOverClassName="border border-blue-500 rounded-md overflow-hidden"
            swapOn="drop"
            payload={{ control, index, register }}
            key={variant.id}
            id={variant.id}
            index={index}
            swapBy="index"
          >
            <Variant
              index={index}
              register={register}
              remove={remove}
              control={control}
            />
          </SwapWrapper>
        ))}
        <button
          type="button"
          onClick={() => append({ options: [{}] })}
          className="duration-150 border py-2 font-medium hover:font-semibold flex gap-x-3 justify-center hover:bg-gray-50 group text-green-700"
        >
          <span>Add new variant</span>
          <span className="text-2xl">
            <MdPlaylistAdd />
          </span>
        </button>
      </div>
    </div>
  );
}

export default VariantsInput;
