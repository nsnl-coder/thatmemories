import { Control } from 'react-hook-form';
import { AiTwotoneDelete } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi2';
import { TbGridDots } from 'react-icons/tb';

import { IProduct } from '@src/yup/productSchema';

import SelectFromGalleryInput from '@components/inputs/SelectFromGalleryInput';

interface Props {
  index: number;
  variantIndex: number;
  control: Control<IProduct>;
}

function OptionMock(props: Props): JSX.Element {
  const { index: optionIndex, variantIndex, control } = props;

  const getFieldName = (fieldName: string) =>
    `variants.${variantIndex}.options.${optionIndex}.${fieldName}`;

  return (
    <div className="flex gap-x-4 pl-12 group py-2">
      <SelectFromGalleryInput
        control={control}
        fieldName={getFieldName('photo')}
      />
      <input className="h-8 rounded-sm -mt-1" />
      <input className="h-8 rounded-sm -mt-1" />

      <div className="flex gap-x-4 items-center self-end h-8 text-zinc-600">
        <button type="button" className="hover:text-red-400 cursor-pointer">
          <AiTwotoneDelete size={26} />
        </button>
        <button type="button" className="hover:text-blue-500 cursor-pointer">
          <HiPlusCircle size={25} />
        </button>
        <button className="text-zinc-600/40 group-hover:text-zinc-600">
          <TbGridDots size={23} />
        </button>
      </div>
    </div>
  );
}

export default OptionMock;
