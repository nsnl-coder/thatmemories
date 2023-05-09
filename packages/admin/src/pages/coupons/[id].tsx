import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import CouponSummary from '@src/_pages/coupons/CouponSummary';
import getRandomString from '@src/utils/getRandomString';
//

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';

import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import Input from '@components/inputs/Input';
import DateRangeInput from '@components/inputs/date/DateRangeInput';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';
import SingleSelectInput from '@src/components/inputs/SingleSelectInput';
import useAlertFormErrors from '@src/hooks/useAlertFormErrors';
import {
  ICoupon,
  createCouponSchema,
  updateCouponSchema,
} from '@thatmemories/yup';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<ICoupon>({
    resolver: yupResolver(
      id === 'create' ? createCouponSchema : updateCouponSchema,
    ),
    defaultValues: {
      isFreeshipping: false,
    },
  });
  useAlertFormErrors(isSubmitted, errors);

  const requestConfig = queryConfig.coupons;

  const { createOne: createCoupon, isLoading: isCreating } =
    useCreateOne<ICoupon>(requestConfig);
  const { updateOne: updateCoupon, isUpdating } =
    useUpdateOne<ICoupon>(requestConfig);
  const { data: coupon } = useGetOne<ICoupon>(requestConfig, reset);

  const onSubmit = (data: ICoupon) => {
    // already check if should create or update
    createCoupon(data, id);
    updateCoupon(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        id={coupon?._id?.toString()}
        requestConfig={requestConfig}
        status={coupon?.status}
        title={coupon?.couponCode || 'Add coupon'}
      />
      <div className="mx-auto flex gap-x-5 justify-center mt-8">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              fieldName="name"
              labelTheme="light"
              placeholder="flash sale..."
              label="Name:"
              required={true}
              control={control}
            />
            <Input
              register={register}
              fieldName="couponCode"
              labelTheme="light"
              placeholder="OFF10"
              label="Coupon code:"
              required={true}
              control={control}
            >
              <button
                type="button"
                className="bg-zinc-600 text-white px-4 rounded-md"
                onClick={() => {
                  setValue('couponCode', getRandomString(10));
                  clearErrors('couponCode');
                }}
              >
                Generate
              </button>
            </Input>
            <div className="flex gap-x-4 py-2">
              <Input
                register={register}
                fieldName="discountAmount"
                labelTheme="light"
                placeholder="99"
                label="Discount amount:"
                required={true}
                control={control}
                type="number"
              />
              <SingleSelectInput
                control={control}
                register={register}
                fieldName="discountUnit"
                labelTheme="light"
                options={[
                  { name: 'By percentage (%)', value: '%' },
                  { name: 'Discount amount ($)', value: '$' },
                ]}
                label="Discount unit:"
                required={true}
              />
            </div>

            <Input
              register={register}
              fieldName="couponQuantity"
              labelTheme="light"
              placeholder="999"
              label="Coupon quantity:"
              required={true}
              control={control}
              type="number"
            />
          </Block>
          <Block>
            <div className="flex gap-x-4">
              <Input
                register={register}
                control={control}
                fieldName="minimumOrder"
                labelTheme="light"
                placeholder="100"
                label="Minimum order:"
                type="number"
              />
              <Input
                register={register}
                control={control}
                fieldName="maximumOrder"
                labelTheme="light"
                placeholder="999"
                label="Maximum order:"
                type="number"
              />
            </div>
            <SingleSelectInput
              control={control}
              register={register}
              fieldName="isFreeshipping"
              labelTheme="light"
              options={[
                { name: 'Freeship', value: 'true' },
                { name: 'Do not freeship', value: 'false' },
              ]}
              label="Free shipping?"
              defaultValue="false"
            />
          </Block>
          <Block>
            <DateRangeInput
              control={control}
              startDateFieldName="startDate"
              endDateFieldName="endDate"
              labelTheme="light"
              label="Discount duration:"
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
              label="Status"
            />
            <div className="flex justify-end mt-6">
              <SubmitBtn isSubmitting={isUpdating || isCreating} />
            </div>
          </Block>
          <Block>
            <CouponSummary control={control} />
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
