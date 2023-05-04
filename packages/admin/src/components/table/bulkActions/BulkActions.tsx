import { AiFillDelete, AiTwotonePushpin } from 'react-icons/ai';

import useDeleteOnes from '@react-query/query/useDeleteOnes';
import useUpdateOnes from '@react-query/query/useupdateOnes';
import { RequestConfig } from '@react-query/queryConfig';

interface Props {
  requestConfig: RequestConfig;
  checkedBoxesIds: string[];
  uiControls?: {
    showPin: boolean;
    showActive: boolean;
    showDraft: boolean;
  };
}

function BulkActions(props: Props): JSX.Element {
  const {
    requestConfig,
    checkedBoxesIds,
    uiControls = {
      showPin: true,
      showActive: true,
      showDraft: true,
    },
  } = props;

  const { deleteOnes } = useDeleteOnes(requestConfig);
  const { updateOnes } = useUpdateOnes(requestConfig);

  const handlePinAll = () => {
    updateOnes({ isPinned: true }, checkedBoxesIds);
  };

  const handleActiveAll = () => {
    updateOnes({ status: 'active' }, checkedBoxesIds);
  };

  const handleDraftAll = () => {
    updateOnes({ status: 'draft' }, checkedBoxesIds);
  };

  return (
    <div className="mx-auto text-sm font-medium py-3 mt-8 sticky bottom-8 border gap-x-3 flex justify-between w-fit rounded-md shadow-lg drop-shadow-xl items-center bg-gray-50 px-6">
      <button
        onClick={() => deleteOnes(checkedBoxesIds)}
        type="button"
        className="border flex items-center gap-x-2 cursor-pointer rounded-md px-4 py-0.5 bg-gray-100 hover:bg-red-400 hover:text-white hover:font-bold"
      >
        <AiFillDelete />
        Delete all
      </button>
      {uiControls.showPin && (
        <button
          onClick={handlePinAll}
          type="button"
          className="border flex items-center gap-x-2 cursor-pointer rounded-md px-4 py-0.5 bg-gray-100 hover:bg-gray-800 hover:text-white hover:font-bold"
        >
          <AiTwotonePushpin />
          Pin to top
        </button>
      )}
      {uiControls.showActive && (
        <button
          type="button"
          className="border cursor-pointer rounded-md px-4 py-0.5 bg-gray-100 hover:bg-green-400 hover:text-white hover:font-bold"
          onClick={handleActiveAll}
        >
          Active all
        </button>
      )}
      {uiControls.showDraft && (
        <button
          onClick={handleDraftAll}
          type="button"
          className="border cursor-pointer rounded-md px-4 py-0.5 bg-gray-100 hover:bg-gray-800 hover:text-white hover:font-bold"
        >
          Draft all
        </button>
      )}
    </div>
  );
}

export default BulkActions;
