import { GrGallery } from 'react-icons/gr';

import { AllowedFilesTypes } from '@src/contexts/GalleryContextProvider';
import useSelectFromGallery from '@src/hooks/useSelectFromGallery';

interface Props {
  className?: string;
  files: string[];
  setFiles: (fn: (files: string[]) => string[]) => void;
  maxFilesCount: number;
  currentFilesCount: number;
  allowedTypes: AllowedFilesTypes;
}

const SelectFromGallery = (props: Props) => {
  const { className, files, setFiles, maxFilesCount, allowedTypes } = props;
  const { selectFromGallery } = useSelectFromGallery();

  const handleSelectFromGallery = async () => {
    const selectedFiles = await selectFromGallery(
      maxFilesCount,
      allowedTypes,
      files,
    );
    if (selectedFiles.length > 0) setFiles(() => selectedFiles);
  };
  return (
    <div
      className={`${className} rounded-lg h-full text-center flex gap-y-3 hover:bg-gray-100 cursor-pointer flex-col items-center justify-center border border-dashed`}
      onClick={handleSelectFromGallery}
    >
      <GrGallery size={30} />
      <span className="text-sm text-gray-600">Select from gallery</span>
    </div>
  );
};

export default SelectFromGallery;
