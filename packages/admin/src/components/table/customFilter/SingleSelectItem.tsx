import { useRouter } from 'next/router';

interface Props {
  queryField: string;
  value: string;
}

function SingleSelectItem(props: Props): JSX.Element {
  const { queryField, value } = props;
  const router = useRouter();
  const query = router.query;

  const onClickHandler = () => {
    router.push({
      query: {
        ...query,
        [queryField]: value,
        page: 1,
      },
    });
  };

  const isChecked = router.query[queryField] == value;

  return (
    <li
      className="cursor-pointer group hover:bg-gray-50"
      onClick={onClickHandler}
    >
      <div className="flex items-center text-paragraph">
        <input
          id={`${queryField}_${value}`}
          type="radio"
          className="radio radio-sm py-2 group-hover:border-gray-400 border-2 px-2"
          name={queryField}
          checked={isChecked}
          // onChange={onChangeHandler}
          readOnly
        />
        <label
          className="py-2 px-3 block flex-grow cursor-pointer"
          htmlFor={`${queryField}_${value}`}
        >
          {value}
        </label>
      </div>
    </li>
  );
}

export default SingleSelectItem;
