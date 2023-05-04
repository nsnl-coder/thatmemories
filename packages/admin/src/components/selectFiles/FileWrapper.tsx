import { AiFillEye } from 'react-icons/ai';
import { TbTrashFilled } from 'react-icons/tb';
import SwapWrapper from '../swapWrapper/SwapWrapper';

import usePreviewOriginalFile from '@src/hooks/usePreviewOriginalFile';
import { DRAG_TYPES } from '@src/types/enum';

interface Props {
  children: JSX.Element | JSX.Element[];
  s3Key: string;
  index: number;
  setFiles: (fn: (files: string[]) => string[]) => void;
  swapPosition: (dragKey: string, dropKey: string) => void;
}

function FileWrapper(props: Props): JSX.Element {
  const { s3Key, index, setFiles, swapPosition } = props;

  const { openPreviewModal } = usePreviewOriginalFile();

  const handleRemoveFile = async () => {
    setFiles((prev) => prev.filter((key) => key !== s3Key));
  };

  return (
    <SwapWrapper
      className={`relative border group rounded-md overflow-hidden shadow-sm flex items-center justify-center aspect-square bg-gray-100 ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      }`}
      itemType={DRAG_TYPES.FILE}
      id={s3Key}
      swapBy="id"
      swapById={swapPosition}
      swapOn="hover"
      index={index}
    >
      <div className="flex items-center justify-center w-full">
        {props.children}
        <div
          className={`absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer peer`}
        ></div>
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100">
          <div>
            <TbTrashFilled
              onClick={handleRemoveFile}
              size={24}
              className="text-gray-400  tooltip-bottom hover:text-red-400 cursor-pointer"
            />
          </div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0 group-hover:opacity-100"
          onClick={() => openPreviewModal(s3Key)}
        >
          <AiFillEye size={42} className="text-gray-400 hover:text-gray-200" />
        </div>
      </div>
    </SwapWrapper>
  );
}

export default FileWrapper;
