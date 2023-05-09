import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useCreateOne from '@react-query/query/useCreateOne';
import useGetOne from '@react-query/query/useGetOne';
import useUpdateOne from '@react-query/query/useUpdateOne';
import queryConfig from '@react-query/queryConfig';
//
import BigBlocks from '@components/form/BigBlocks';
import Block from '@components/form/Block';
import SmallBlocks from '@components/form/SmallBlocks';
import SubmitBtn from '@components/form/SubmitBtn';
import FilesInput from '@components/inputs/FilesInput';
import Input from '@components/inputs/Input';
import UpdatePageHeading from '@components/updatePage/UpdatePageHeading';
import UpdatePageWrapper from '@components/updatePage/UpdatePageWrapper';
import SingleSelectInput from '@src/components/inputs/SingleSelectInput';
import Textarea from '@src/components/inputs/Textarea';
import useAlertFormErrors from '@src/hooks/useAlertFormErrors';
import {
  ICollection,
  createCollectionSchema,
  updateCollectionSchema,
} from '@thatmemories/yup';

function Create(): JSX.Element {
  const id = useRouter().query.id;
  const requestConfig = queryConfig.collections;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<ICollection>({
    resolver: yupResolver(
      id === 'create' ? createCollectionSchema : updateCollectionSchema,
    ),
  });

  useAlertFormErrors(isSubmitted, errors);

  const { createOne: createCollection, isLoading: isCreating } =
    useCreateOne<ICollection>(requestConfig);

  const { updateOne: updateCollection, isUpdating } =
    useUpdateOne<ICollection>(requestConfig);

  const { data: collection } = useGetOne<ICollection>(requestConfig, reset);

  const onSubmit = (data: ICollection) => {
    // already check if should create or update
    updateCollection(data, id);
    createCollection(data, id);
  };

  return (
    <UpdatePageWrapper
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      reset={reset}
    >
      <UpdatePageHeading
        title={collection?.display_name || 'Add collection'}
        requestConfig={requestConfig}
        id={collection?._id?.toString()}
        status={collection?.status}
      />
      <div className="mx-auto flex gap-x-5 justify-center">
        <BigBlocks>
          <Block>
            <Input
              register={register}
              fieldName="display_name"
              control={control}
              label="Display name:"
              labelTheme="light"
              tooltip="This will be displayed to user."
            />
            <Input
              register={register}
              fieldName="hidden_name"
              control={control}
              label="Hidden name:"
              labelTheme="light"
              tooltip="This name does not display to user"
            />
            <Textarea
              control={control}
              fieldName="description"
              labelTheme="light"
              label="Description:"
              register={register}
            />
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
            <SingleSelectInput
              register={register}
              control={control}
              fieldName="status"
              options={['draft', 'active']}
              labelTheme="bold"
            />
            <div className="flex justify-end mt-4">
              <SubmitBtn isSubmitting={isUpdating || isCreating} />
            </div>
          </Block>
          <Block>
            <FilesInput
              allowedTypes="image"
              control={control}
              fieldName="photo"
              maxFilesCount={1}
              labelTheme="bold"
              label="Collection photo"
            />
          </Block>
        </SmallBlocks>
      </div>
    </UpdatePageWrapper>
  );
}

export default Create;
