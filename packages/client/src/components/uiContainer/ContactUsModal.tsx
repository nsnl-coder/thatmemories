import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@src/components/form/Input';
import { useAppDispatch } from '@src/hooks/redux';
import useCreateOne from '@src/react-query/query/useCreateOne';
import queryConfig from '@src/react-query/queryConfig';
import { openSuccessModal } from '@src/store/notifyModals';
import { IContact, createContactSchema } from '@thatmemories/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMailSharp } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';
import Textarea from '../form/TextArea';

function ContactUsModal(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const id = useRouter().query.id;
  const { control, register, handleSubmit } = useForm<IContact>({
    resolver: yupResolver(createContactSchema),
  });

  const { createOne, isLoading, isCreated } = useCreateOne<IContact>(
    queryConfig.contacts,
  );

  if (isCreated) {
    dispatch(
      openSuccessModal({
        message:
          'Thank you for contacting us. We will reply your message soon.',
        leftButtonText: 'Back to home',
        leftButtonLink: '/',
        rightButtonText: 'Close',
      }),
    );

    return null;
  }

  const onSubmit = (data: IContact) => {
    createOne(data, id);
  };

  return (
    <div>
      <label
        htmlFor="contact-us-modal"
        className="capitalize cursor-pointer hover:text-blue-600 hover:underline"
      >
        <div className="py-2.5 px-4">Contact us</div>
      </label>
      <input type="checkbox" id="contact-us-modal" className="modal-toggle" />
      <label htmlFor="contact-us-modal" className="modal cursor-pointer">
        <label className="modal-box grid grid-cols-2 max-w-4xl w-full bg-base-100 rounded-lg pb-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 px-6"
          >
            <div className="mb-4">
              <h3 className="text-3xl font-medium">Contact us</h3>
              <p className="text-neutral/70">
                We are here for you, how can we help?
              </p>
            </div>
            <Input
              control={control}
              fieldName="fullname"
              labelTheme="light"
              register={register}
              placeholder="Enter your fullname:"
              className="bg-gray-100"
            />
            <Input
              control={control}
              labelTheme="light"
              register={register}
              fieldName="email"
              placeholder="enter your email"
              className="bg-gray-100"
            />
            <Textarea
              control={control}
              labelTheme="light"
              register={register}
              fieldName="content"
              placeholder="Go ahead, we are listening"
              className="bg-gray-100"
            />
            <button className="bg-primary py-2 text-white font-medium rounded-md">
              Submit
            </button>
          </form>
          <div className="flex flex-col justify-between">
            <Image
              src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3144883746427--4c8c-9f9d-cbbd6b2a6287.png"
              width={400}
              height={400}
              alt="illustation image"
            />
            <div className="flex flex-col gap-y-2 ml-9">
              <div className="flex items-center gap-x-4">
                <span className="text-primary">
                  <MdLocationOn size={20} />
                </span>
                <span>2520 Barton Street East</span>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-primary rounded-full flex items-center justify-center">
                  <BsFillTelephoneFill size={16} />
                </span>
                <span>+12897756050</span>
              </div>
              <div className="flex gap-x-4 items-center">
                <span className="text-primary">
                  <IoMailSharp size={18} />
                </span>
                <span>nsnl.coder@gmail.com</span>
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default ContactUsModal;
