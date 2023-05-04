import { Control, useController, UseFormRegister } from 'react-hook-form';
import { BiImageAdd } from 'react-icons/bi';
import { IoIosRemoveCircle } from 'react-icons/io';
import FilePreview from '../filePreview/FilePreview';

import useSelectFromGallery from '@src/hooks/useSelectFromGallery';

interface Props {
  control: Control<any>;
  fieldName: string;
  className?: string;
  size?: number;
}

function SelectFromGalleryInput(props: Props): JSX.Element {
  const { control, fieldName, className, size = 36 } = props;
  const { selectFromGallery } = useSelectFromGallery();
  const { field } = useController({ control, name: fieldName });

  const onSelectPhoto = async () => {
    if (field.value) return;

    const photos = await selectFromGallery(1, 'image');

    if (photos.length > 0) {
      field.onChange(photos[0]);
    }
  };

  const handleRemoveImage = () => {
    field.onChange(undefined);
  };

  return (
    <div
      className={`${className} relative bg-gray-100 cursor-pointer border w-14 aspect-square self-end flex-shrink-0 flex items-center justify-center`}
      onClick={onSelectPhoto}
    >
      {!field.value && <BiImageAdd size={size} />}
      {field.value && (
        <FilePreview src={field.value} className="w-full h-full object-cover" />
      )}
      {field.value && (
        <div
          onClick={() => handleRemoveImage()}
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 hover:text-red-400"
        >
          <IoIosRemoveCircle size={20} />
        </div>
      )}
    </div>
  );
}

export default SelectFromGalleryInput;
