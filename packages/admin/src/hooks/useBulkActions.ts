import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface Checkbox {
  checked: boolean;
  id: string;
  isPinned?: boolean;
}

interface TRowData {
  _id?: string;
  isPinned?: boolean;
}

const useBulkActions = (data: TRowData[] | undefined) => {
  const pageNumber = useRouter().query.page;
  const [checkBoxes, setCheckBoxes] = useState<Checkbox[]>([]);

  useEffect(() => {
    setCheckBoxes([]);
  }, [pageNumber]);

  useEffect(() => {
    if (!data) return;
    const rows = data.filter((row) => row._id) as Required<TRowData>[];
    setCheckBoxes(
      rows.map((row) => ({
        id: row._id,
        checked: false,
        isPinned: row.isPinned,
      })),
    );
  }, [data]);

  const getCheckboxIndex = (id: string) => {
    const index = checkBoxes.findIndex((checkbox) => checkbox.id === id);
    return index;
  };

  const handleCheckBoxChange = (checkbox: Checkbox) => {
    const index = getCheckboxIndex(checkbox.id);

    if (index !== -1) {
      setCheckBoxes((prev) => [
        ...prev.slice(0, index),
        checkbox,
        ...prev.slice(index + 1),
      ]);
    }
  };

  const toggleRowSelection = (id: string | undefined) => {
    if (!id) return;

    const index = getCheckboxIndex(id);
    const checkbox = checkBoxes[index];

    if (index !== -1) {
      setCheckBoxes((prev) => [
        ...prev.slice(0, index),
        {
          ...checkbox,
          checked: !checkbox.checked,
        },
        ...prev.slice(index + 1),
      ]);
    }
  };

  const updateAllCheckBoxes = (checked: boolean) => {
    const updatedCheckBoxes = checkBoxes.map((checkbox) => ({
      ...checkbox,
      checked,
    }));
    setCheckBoxes(updatedCheckBoxes);
  };

  const checkedBoxesIds = checkBoxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  return {
    handleCheckBoxChange,
    updateAllCheckBoxes,
    checkedBoxesIds,
    toggleRowSelection,
    isCheckedAll:
      checkedBoxesIds.length === checkBoxes.length && checkBoxes.length > 0,
  };
};

export default useBulkActions;
