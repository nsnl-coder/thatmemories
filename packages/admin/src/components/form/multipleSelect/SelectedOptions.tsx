import { IoMdClose } from 'react-icons/io';
import { Option } from './MultipleSelect';

interface Props {
  selectedOptions: string[];
  setSelectedOptions: (fn: (options: string[]) => string[]) => void;
  options: Option[];
}

function SelectedOptions(props: Props): JSX.Element {
  const { selectedOptions, setSelectedOptions, options } = props;

  const unselectDeletedFiles = (_id: string | undefined) => {
    if (!_id) return;

    setSelectedOptions((prev) => {
      return prev.filter((option) => option !== _id);
    });
  };

  const foundOptions = options.filter(
    (option) => option._id && selectedOptions.includes(option._id.toString()),
  );

  const optionIds = options.map((option) => option._id.toString());

  const notFoundOptions: Option[] = selectedOptions
    .filter((option) => !optionIds.includes(option))
    .map((option) => ({
      _id: option as any,
      name: 'Not found',
    }));

  const allOptions = [...foundOptions, ...notFoundOptions];

  return (
    <div className="flex gap-1.5 flex-wrap ">
      {allOptions.map((option) => (
        <div
          key={option._id.toString()}
          className="rounded-full border px-3 leading-5 py-1 flex items-center cursor-pointer hover:bg-gray-100"
        >
          <p className="max-w-[190px] truncate">{option.name}</p>
          <span
            onClick={() => unselectDeletedFiles(option._id.toString())}
            className="px-2 hover:text-red-400"
          >
            <IoMdClose />
          </span>
        </div>
      ))}
      {selectedOptions.length === 0 && (
        <div className="text-gray-700/70 multiple-select-text">Select one</div>
      )}
    </div>
  );
}

export default SelectedOptions;
