import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Control, UseFormReset, useFormState } from 'react-hook-form';

interface Props {
  reset: UseFormReset<any>;
  control: Control<any>;
}

function UpdatePageHeader(props: Props): JSX.Element | null {
  const { reset, control } = props;
  const id = useRouter().query.id;
  const { isDirty } = useFormState({ control });
  const isUpdating = useIsMutating();

  if (!isDirty) return null;

  return (
    <div className="w-full fixed top-0 left-0 bg-zinc-800 h-16 flex text-white z-40">
      <div className="w-60 h-16"></div>
      <div className="flex-grow max-w-5xl px-6 mx-auto flex items-center justify-between">
        <h1 className="font-semibold"> Unsaved changes </h1>
        <div className="flex gap-x-3">
          <button
            type="button"
            className="px-4 py-1 rounded-md border border-gray-500 hover:bg-white/10"
            onClick={() => reset()}
          >
            Discard
          </button>
          <button
            type="submit"
            className={`px-4 py-1 capitalize rounded-md border border-gray-500  hover:brightness-90 ${
              isUpdating ? 'pointer-events-none opacity-50' : 'bg-primary'
            }`}
          >
            {id === 'create' ? 'create' : 'save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePageHeader;
