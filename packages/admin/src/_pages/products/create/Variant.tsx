import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import Option from './Option';

import { DRAG_TYPES } from '@src/types/enum';
import { IProduct } from '@src/yup/productSchema';

import SwapWrapper from '@components/swapWrapper/SwapWrapper';

interface Props {
  register: UseFormRegister<IProduct>;
  index: number;
  remove: (index?: number | number[]) => void;
  control: Control<IProduct>;
}

function Variant(props: Props): JSX.Element {
  const {
    register,
    index: variantIndex,
    remove: removeVariant,
    control,
  } = props;

  const {
    fields: options,
    remove: removeOption,
    insert,
    swap,
  } = useFieldArray({ control, name: `variants.${variantIndex}.options` });

  return (
    <div className="bg-gray-50 px-6 py-10 rounded-md overflow-hidden">
      <div className="flex items-center mb-6 gap-x-6">
        <div className="h-10 self-end flex items-center cursor-pointer">
          <TbGridDots size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2 text-sm">Variant Name:</label>
          <input
            className="h-10 w-full px-4 text-lg"
            {...register(`variants.${variantIndex}.variantName`)}
          />
        </div>
        <div className="flex self-end h-9 items-center">
          <button
            type="button"
            className="hover:text-danger"
            onClick={() => removeVariant(variantIndex)}
            data-tip="remove collection"
          >
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>
      <div>
        {options.map((option, index) => (
          <SwapWrapper
            swapByIndex={swap}
            id={option.id}
            index={index}
            swapBy="index"
            itemType={DRAG_TYPES.OPTION}
            swapOn="drop"
            payload={{
              register,
              index,
              variantIndex,
              control,
            }}
            key={option.id}
            isOverClassName="border border-blue-500"
            className="rounded-sm overflow-hidden"
          >
            <Option
              register={register}
              index={index}
              variantIndex={variantIndex}
              insert={insert}
              remove={removeOption}
              control={control}
            />
          </SwapWrapper>
        ))}
      </div>
    </div>
  );
}

export default Variant;
