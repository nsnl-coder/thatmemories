import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

//
import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import SmallBlocks from '@components/form/SmallBlocks';
import Input from '@components/inputs/Input';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';
import SubmitBtn from '@src/components/form/SubmitBtn';
import SingleSelectInput from '@src/components/inputs/SingleSelectInput';
import useAlertFormErrors from '@src/hooks/useAlertFormErrors';
import { IOrder, updateOrderSchema } from '@thatmemories/yup';

function Update(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.orders;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<IOrder>({
    resolver: yupResolver(updateOrderSchema, { stripUnknown: true }),
  });

  useAlertFormErrors(isSubmitted, errors);

  const { createOne: createOrder, isLoading: isCreating } =
    useCreateOne<IOrder>(requestConfig);

  const { updateOne: updateOrder, isUpdating } =
    useUpdateOne<IOrder>(requestConfig);

  const { data: order } = useGetOne<IOrder>(requestConfig, reset);

  const onSubmit = (data: IOrder) => {
    // already check if should create or update
    updateOrder(data, id);
    createOrder(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        title={order?.orderNumber || 'Not found'}
        requestConfig={requestConfig}
        id={order?._id.toString()}
        status={undefined}
      />
      <div className="mx-auto flex gap-x-5 justify-center">
        <BigBlocks>
          <Block className="grid grid-cols-2 gap-x-4">
            <Input
              register={register}
              fieldName="orderNumber"
              control={control}
              label="Order number:"
              labelTheme="light"
              readonly
            />
            <div className="flex gap-x-4">
              <Input
                register={register}
                fieldName="subTotal"
                control={control}
                label="Sub total:"
                labelTheme="light"
                readonly
              />
              <Input
                register={register}
                fieldName="grandTotal"
                control={control}
                label="Grand total:"
                labelTheme="light"
                readonly
              />
            </div>
            <div className="flex gap-4">
              <Input
                register={register}
                fieldName="discount.inDollar"
                control={control}
                label="Discount in $:"
                labelTheme="light"
                readonly
              />
              <Input
                register={register}
                fieldName="discount.inPercent"
                control={control}
                label="Discount in %:"
                labelTheme="light"
                readonly
              />
            </div>
          </Block>
          <Block blockTitle="Shipping details">
            <div className="flex gap-x-4">
              <Input
                register={register}
                fieldName="fullname"
                control={control}
                label="Customer fullname:"
                labelTheme="light"
              />
              <Input
                register={register}
                fieldName="email"
                control={control}
                label="Email:"
                labelTheme="light"
              />
            </div>
            <Input
              register={register}
              fieldName="shippingAddress.line1"
              control={control}
              label="Line 1:"
              labelTheme="light"
            />
            {order?.shippingAddress.line2 && (
              <Input
                register={register}
                fieldName="shippingAddress.line2"
                control={control}
                label="Line 2:"
                labelTheme="light"
              />
            )}
            <Input
              register={register}
              fieldName="shippingAddress.city"
              control={control}
              label="City:"
              labelTheme="light"
            />
            <div className="grid grid-cols-3 gap-x-3">
              <Input
                register={register}
                fieldName="shippingAddress.state"
                control={control}
                label="State:"
                labelTheme="light"
              />
              <Input
                register={register}
                fieldName="shippingAddress.postal_code"
                control={control}
                label="Postal code:"
                labelTheme="light"
              />
              <Input
                register={register}
                fieldName="shippingAddress.country"
                control={control}
                label="Country:"
                labelTheme="light"
              />
            </div>
          </Block>
          <Block>
            <SingleSelectInput
              register={register}
              control={control}
              fieldName="isPinned"
              label="Pin?"
              labelTheme="bold"
              options={[
                { name: 'Do not pin', value: 'false' },
                { name: 'Pin to top', value: 'true' },
              ]}
            />
          </Block>
        </BigBlocks>
        <SmallBlocks>
          <Block>
            <Input
              register={register}
              fieldName="shippingStatus"
              control={control}
              label="Shipping status:"
              labelTheme="light"
            />
            <Input
              register={register}
              fieldName="paymentStatus"
              control={control}
              label="Payment status"
              labelTheme="light"
            />
            <div className="flex justify-end">
              <SubmitBtn isSubmitting={isUpdating} />
            </div>
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Update;
