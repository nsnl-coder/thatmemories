import { Dispatch, SetStateAction } from 'react';
import { Option } from './MultipleSelect';

interface Props {
  option: Option;
  setSelectedOptions: (fn: (options: string[]) => string[]) => void;
  selectedOptions: string[];
}

function MultipleSelectItem(props: Props): JSX.Element {
  const { option, setSelectedOptions, selectedOptions } = props;

  const handleToggleSelection = () => {
    setSelectedOptions((prev) => {
      const index = prev.findIndex((_id) => _id === option._id);
      if (!option._id) return prev;

      if (index === -1) return [...prev, option._id];
      else {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      }
    });
  };

  const isChecked =
    selectedOptions.findIndex((_id) => _id === option._id) !== -1;

  return (
    <div
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-x-4"
      onClick={() => handleToggleSelection()}
    >
      <input
        type="checkbox"
        className="checkbox checkbox-sm rounded-md"
        checked={isChecked}
        readOnly
      />
      <span>{option.name}</span>
    </div>
  );
}

export default MultipleSelectItem;
