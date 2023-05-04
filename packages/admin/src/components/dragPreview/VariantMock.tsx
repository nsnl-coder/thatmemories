import { Control, useWatch } from 'react-hook-form';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import Option from './OptionMock';

import { IProduct } from '@src/yup/productSchema';

interface Props {
  index: number;
  control: Control<IProduct>;
}

function VariantMock(props: Props): JSX.Element {
  const { index: variantIndex, control } = props;
  const variant = useWatch({ control, name: `variants.${variantIndex}` });

  return (
    <div className="bg-gray-100">
      <div className="flex items-center mb-6 gap-x-6">
        <div className="h-10 self-end flex items-center cursor-pointer">
          <TbGridDots size={24} />
        </div>
        <div className="flex-grow">
          <label className="block mb-2 text-sm">Variant Name:</label>
          <input className="h-10 w-full px-4 text-lg" />
        </div>
        <div className="flex self-end h-9 items-center">
          <button type="button">
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>
      <div>
        {variant.options?.map((option, index) => (
          <Option
            key={index}
            control={control}
            variantIndex={variantIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default VariantMock;
