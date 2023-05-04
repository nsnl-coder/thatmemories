import { ChangeEvent } from 'react';

import { Checkbox } from '@src/hooks/useBulkActions';

interface Props {
  id?: string;
  checkedBoxesIds: string[];
  handleCheckBoxChange: (checkbox: Checkbox) => void;
}

function CheckBoxColumn(props: Props): JSX.Element {
  const { handleCheckBoxChange, id, checkedBoxesIds } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (id) {
      handleCheckBoxChange({
        id,
        checked: e.target.checked,
      });
    }
  };

  return (
    <td>
      <div className="px-4">
        <input
          type="checkbox"
          className="checkbox checkbox-sm rounded-md"
          checked={!!id && checkedBoxesIds.includes(id)}
          onChange={handleChange}
        />
      </div>
    </td>
  );
}

export default CheckBoxColumn;
