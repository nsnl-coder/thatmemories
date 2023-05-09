import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import Input from '@components/inputs/Input';
import SingleSelectInput from '@components/inputs/SingleSelectInput';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
//
import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';
import useAlertFormErrors from '@src/hooks/useAlertFormErrors';
import { createShippingSchema, IShipping, updateShippingSchema } from '@thatmemories/yup';

function Create(): JSX.Element {
  const id = useRouter().query.id;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<IShipping>({
    resolver: yupResolver(
      id === 'create' ? createShippingSchema : updateShippingSchema,
      { stripUnknown: true },
    ),
  });

  useAlertFormErrors(isSubmitted, errors);

  const requestConfig = queryConfig.shippings;

  const { createOne: createShipping, isLoading: isCreating } =
    useCreateOne<IShipping>(requestConfig);
  const { updateOne: updateShipping, isUpdating } =
    useUpdateOne<IShipping>(requestConfig);
  const { data: shipping } = useGetOne<IShipping>(requestConfig, reset);

  const onSubmit = (data: IShipping) => {
    // already check if should create or update
    createShipping(data, id);
    updateShipping(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        id={shipping?._id.toString()}
        requestConfig={requestConfig}
        status={shipping?.status}
        title={shipping?.display_name || 'Add shipping method'}
      />
      <div className="mx-auto flex gap-x-5 justify-center mt-8">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              control={control}
              fieldName="display_name"
              labelTheme="light"
              placeholder="Express shipping"
              label="Display name:"
              tooltip="this name will be displayed to user"
            />
            <Input
              register={register}
              control={control}
              fieldName="fees"
              labelTheme="light"
              placeholder="9.99"
              label="Fees:"
              type="number"
            />
            <Input
              register={register}
              control={control}
              fieldName="freeshipOrderOver"
              labelTheme="light"
              label="Freeship order over:"
              placeholder="199"
              tooltip="Leave empty if you not want freeship for all orders!"
            />
          </Block>
          <Block>
            <div className="flex gap-x-3">
              <Input
                register={register}
                control={control}
                fieldName="delivery_min"
                labelTheme="light"
                placeholder="2"
                label="Delivery Min:"
                type="number"
              />
              <SingleSelectInput
                control={control}
                register={register}
                fieldName="delivery_min_unit"
                labelTheme="light"
                options={['hour', 'day', 'business_day', 'week', 'month']}
                label="unit"
              />
            </div>
            <div className="flex gap-x-3">
              <Input
                register={register}
                control={control}
                fieldName="delivery_max"
                labelTheme="light"
                placeholder="6"
                label="Delivery max:"
                type="number"
              />
              <SingleSelectInput
                control={control}
                register={register}
                fieldName="delivery_max_unit"
                labelTheme="light"
                options={['hour', 'day', 'business_day', 'week', 'month']}
                label="unit"
              />
            </div>
            <Input
              register={register}
              control={control}
              fieldName="delivery_estimation"
              labelTheme="light"
              label="Delivery estimation:"
              placeholder="3-6 business days"
              tooltip="This text will be displayed at checkout."
            />
          </Block>
        </BigBlocks>
        <SmallBlocks>
          <Block>
            <SingleSelectInput
              control={control}
              register={register}
              fieldName="status"
              labelTheme="bold"
              options={['draft', 'active']}
              label="status"
            />
            <div className="flex justify-end mt-4">
              <SubmitBtn isSubmitting={isUpdating || isCreating} />
            </div>
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
