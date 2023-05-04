import { useRouter } from 'next/router';

interface Props {
  value: string;
  queryField: string;
}

function SelectItem(props: Props): JSX.Element {
  const { value, queryField } = props;
  const router = useRouter();
  const query = router.query;

  const onClickHandler = () => {
    let oldFilter = query[queryField];

    if (oldFilter === undefined) oldFilter = [];
    if (typeof oldFilter === 'string') oldFilter = [oldFilter];

    const index = oldFilter.indexOf(value);

    if (index === -1) {
      oldFilter.push(value);
    } else {
      oldFilter.splice(index, 1);
    }

    router.push({
      query: {
        ...query,
        [queryField]: oldFilter,
        page: 1,
      },
    });
  };

  const isChecked = router.query[queryField]?.includes(value);

  return (
    <li
      onClick={onClickHandler}
      className="flex items-center gap-x-3 py-2 group cursor-pointer"
    >
      <input
        type="checkbox"
        className="checkbox checkbox-sm rounded-sm group-hover:border-gray-400 border-2"
        name="checkbox"
        checked={isChecked}
        readOnly
      />
      <span>{value}</span>
    </li>
  );
}

export default SelectItem;
