import { useRouter } from 'next/router';
import { FaSortDown } from 'react-icons/fa';
import MultipleSelectItem from './MutipleSelectItem';

interface Props {
  displayText?: string;
  queryField: string;
  fieldValues: string[];
}

function MultipleSelect(props: Props): JSX.Element {
  const router = useRouter();
  const query = router.query;

  const { displayText, queryField, fieldValues } = props;

  const clearFilter = () => {
    delete query[queryField];
    router.push({
      query: {
        ...query,
        page: 1,
      },
    });
  };

  return (
    <div className={`dropdown dropdown-start text-paragraph`}>
      <label
        tabIndex={0}
        className="border px-4 py-0.5 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-full border-dashed flex items-center gap-x-1"
      >
        <span>{displayText || queryField}</span>
        <span>
          <FaSortDown className="mb-1.5" />
        </span>
      </label>
      <div className="dropdown-content p-4 shadow border bg-base-100 w-52 mt-1.5">
        <ul tabIndex={0}>
          {fieldValues.map((value) => (
            <MultipleSelectItem
              key={value}
              value={value}
              queryField={queryField}
            />
          ))}
        </ul>
        <button
          onClick={clearFilter}
          type="button"
          className="block mx-auto mt-2 hover:underline text-blue-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default MultipleSelect;
