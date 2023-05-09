import { useState } from 'react';
import { useController, useFormState } from 'react-hook-form';
import { AiOutlineDown } from 'react-icons/ai';

import { ObjectId } from '@src/types/objectId';

import ErrorMessage from '../ErrorMessage';
import Label, { LabelProps } from '../Label';
import MultipleSelectItem from './MultipleSelectItem';
import SelectedOptions from './SelectedOptions';

export interface Option {
  name?: string;
  _id: ObjectId;
}

interface Props extends LabelProps {
  options: Option[] | undefined;
  fieldName: string;
  control: any;
  tooltip?: string;
  excludes?: string[] | undefined;
}

function MultipleSelect(props: Props): JSX.Element {
  const {
    options = [],
    excludes = [],
    required,
    fieldName,
    labelTheme,
    label,
    control,
    tooltip,
  } = props;

  const { errors } = useFormState({ control });

  const [keyword, setKeyword] = useState<string>('');
  const [focusList, setFocusList] = useState(false);

  const matchedOptions = options.filter(
    (option) =>
      option.name?.toLowerCase().includes(keyword.toLowerCase()) &&
      option._id &&
      !excludes.includes(option._id.toString()),
  );

  const { field } = useController({ name: fieldName, control });
  const selectedOptions: string[] = field.value || [];

  const setSelectedOptions = (fn: (options: string[]) => string[]) => {
    const newOptions = fn(selectedOptions);
    field.onChange(newOptions);
  };

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        labelTheme={labelTheme}
        label={label}
        required={required}
        tooltip={tooltip}
      />

      <div className="dropdown w-full">
        <label tabIndex={0} className="group">
          <div className="px-4 py-1.5 min-h-[40px] border rounded-md flex flex-wrap">
            <input
              type="text"
              className={`w-full absolute opacity-0 focus:relative focus:opacity-100 outline-none mb-2 px-0.5 group-focus:opacity-100 group-focus:relative ${
                focusList ? 'relative opacity-100' : ''
              }`}
              placeholder="type something..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="flex items-center justify-between cursor-pointer w-full">
              <SelectedOptions
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                options={options}
              />
              <span>
                <AiOutlineDown />
              </span>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          onFocus={() => setFocusList(true)}
          onBlur={() => setFocusList(false)}
          className="dropdown-content w-full mt-0.5 bg-white border py- max-h-60 overflow-auto small-scrollbar shadow-xl rounded-md py-4"
        >
          {matchedOptions.map((option) => (
            <MultipleSelectItem
              key={option._id?.toString()}
              option={option}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
            />
          ))}
          {matchedOptions.length === 0 && (
            <li className="px-4 py-2">Cant not find any items!</li>
          )}
        </ul>
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default MultipleSelect;
