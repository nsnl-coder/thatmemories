import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@src/components/form/Input';
import { IUser, updateUserSchema } from '@thatmemories/yup';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FaAddressBook } from 'react-icons/fa';
import Card from './Card';

function ChangeAdressModal(): JSX.Element {
  const { control, register } = useForm<IUser>({
    resolver: yupResolver(updateUserSchema),
  });

  return (
    <div>
      <label htmlFor="my-modal-4">
        <Card
          title="your addresses"
          description="Change your name & shipping address"
        >
          <FaAddressBook size={28} />
        </Card>
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label
          htmlFor=""
          className="modal-box grid grid-cols-2 gap-x-16 max-w-4xl"
        >
          <div className="flex flex-grow">
            <Image
              className="h-full object-cover object-left"
              src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3144867396502--4082-acba-d172fa9358eb.png"
              alt="change address illustration image"
              width={400}
              height={400}
            />
          </div>
          <div className="relative flex flex-col gap-y-3 w-60">
            <Input
              control={control}
              register={register}
              fieldName="email"
              labelTheme="light"
              placeholder="name"
              label="Email:"
              readonly
            />
            <Input
              control={control}
              register={register}
              fieldName="fullname"
              labelTheme="light"
              placeholder="name"
              label="Name:"
            />
            <Input
              control={control}
              register={register}
              fieldName="phone"
              labelTheme="light"
              placeholder="phone"
              label="Phone:"
            />
            <Input
              control={control}
              register={register}
              fieldName="shippingAddress.line1"
              labelTheme="light"
              placeholder="Shipping address line 1"
              label="Address line1:"
            />
            <Input
              control={control}
              register={register}
              fieldName="shippingAddress.line2"
              labelTheme="light"
              placeholder="Shipping address line 2"
              label="Address line2:"
            />
            <button
              type="button"
              className="w-full bg-primary py-1.5 text-white rounded-md"
            >
              Change your info
            </button>
          </div>
        </label>
      </label>
    </div>
  );
}

export default ChangeAdressModal;
