import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import VariantsInput from '@src/_pages/products/create/VariantsInput';
import { toastError } from '@src/utils/toast';

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useGetOnes from '@react-query/query/useGetOnes';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';

import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import MultipleSelect from '@components/form/multipleSelect/MultipleSelect';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import FilesInput from '@components/inputs/FilesInput';
import Input from '@components/inputs/Input';
import RichText from '@components/inputs/RichText';
import Textarea from '@components/inputs/Textarea';
import UpdatePageHeader from '@components/updatePage/UpdatePageHeader';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';
import SingleSelectInput from '@src/components/inputs/SingleSelectInput';
import useAlertFormErrors from '@src/hooks/useAlertFormErrors';
import {
  createProductSchema,
  ICollection,
  IProduct,
  updateProductSchema,
} from '@thatmemories/yup';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.products;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<IProduct>({
    resolver: yupResolver(
      id === 'create' ? createProductSchema : updateProductSchema,
      { stripUnknown: true },
    ),
    defaultValues: {
      isPinned: false,
      name: '99. Men New Fashion Casual Shoes for Light Soft Breathable Vulcanize Shoes High',
    },
  });
  useAlertFormErrors(isSubmitted, errors);

  const { createOne: createProduct, isLoading: isCreating } =
    useCreateOne<IProduct>(requestConfig);

  const {
    updateOne: updateProduct,
    error: updateError,
    isUpdating,
  } = useUpdateOne<IProduct>(requestConfig);

  const { data: product } = useGetOne<IProduct>(requestConfig, reset);

  const { data: collections } = useGetOnes<ICollection[]>(
    queryConfig.collections,
    {
      includeUrlQuery: false,
      additionalQuery: {
        itemsPerPage: 1000,
      },
    },
  );

  const onSubmit = (data: IProduct) => {
    // already check if should create or update
    updateProduct(data, id);
    createProduct(data, id);
  };

  useEffect(() => {
    if (!updateError) return;
    if (
      updateError.response?.data.message ===
      'Can not find collections with provided ids'
    ) {
      toastError(
        'Can not find collections with provided ids! Check if you deleted the collection!',
      );
    }
  }, [updateError]);

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeader reset={reset} control={control} />
      <UpdatePageHeading
        title={product?.name || 'Add product'}
        requestConfig={requestConfig}
        id={product?._id.toString()}
        status={product?.status}
      />
      <div className="mx-auto flex gap-x-5 justify-center mt-8">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              control={control}
              fieldName="name"
              labelTheme="light"
              placeholder="T-shirt for man....."
              label="Name:"
            />
            <Textarea
              register={register}
              control={control}
              fieldName="overview"
              labelTheme="light"
              placeholder="short description about your product"
              label="Overview:"
            />
            <div className="flex gap-3">
              <Input
                register={register}
                control={control}
                fieldName="price"
                labelTheme="light"
                placeholder="19.99"
                label="Price:"
                type="number"
              />
              <Input
                register={register}
                control={control}
                fieldName="discountPrice"
                labelTheme="light"
                placeholder="9.99"
                type="number"
                label="Discount price:"
                tooltip="If you do not want to show discount price, set to 0."
              />
            </div>
          </Block>
          <Block>
            <RichText
              control={control}
              fieldName="description"
              labelTheme="light"
              label="Description:"
            />
            <SingleSelectInput
              control={control}
              register={register}
              fieldName="isPinned"
              labelTheme="light"
              options={[
                { name: 'pin', value: 'true' },
                { name: 'Do not pin', value: 'false' },
              ]}
              label="Pin to top?"
            />
          </Block>
          <Block>
            <FilesInput
              fieldName="images"
              allowedTypes="*"
              control={control}
              labelTheme="bold"
              maxFilesCount={20}
              key={1}
              label="Product media"
              tooltip="Video or images. Max 20 files"
            />
          </Block>
          <Block>
            <FilesInput
              fieldName="previewImages"
              allowedTypes="image"
              control={control}
              labelTheme="bold"
              maxFilesCount={5}
              key={2}
              label="Preview images"
              tooltip="Images that display when you hover on card. Max 5 images."
            />
          </Block>
          <Block>
            <MultipleSelect
              control={control}
              fieldName="collections"
              labelTheme="bold"
              options={collections}
              label="Collection:"
            />
          </Block>
          <Block>
            <VariantsInput
              fieldName="variants"
              control={control}
              labelTheme="bold"
              register={register}
              label="Variants:"
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
