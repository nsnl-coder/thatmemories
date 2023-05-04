import { ChangeEvent } from 'react';

interface Props {
  updateAllCheckBoxes: (checked: boolean) => void;
  isChecked: boolean;
}

function HeaderCheckBox(props: Props): JSX.Element {
  const { updateAllCheckBoxes, isChecked } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAllCheckBoxes(e.target.checked);
  };

  return (
    <th>
      <div className="px-4">
        <input
          type="checkbox"
          className="checkbox checkbox-sm rounded-md"
          onChange={handleChange}
          checked={isChecked}
        />
      </div>
    </th>
  );
}

export default HeaderCheckBox;
