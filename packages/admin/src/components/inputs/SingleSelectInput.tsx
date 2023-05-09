import { Control, UseFormRegister, useFormState } from 'react-hook-form';

import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';

interface Option {
  name: string;
  value: string;
}

interface Props extends LabelProps {
  register: UseFormRegister<any>;
  options: string[] | Option[];
  defaultValue?: string;
  className?: string;
  control: Control<any>;
}

function SingleSelectInput(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    label,
    required = false,
    options,
    labelTheme,
    className,
    tooltip,
    control,
  } = props;

  const { errors } = useFormState({ control });

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <select
        {...register(fieldName)}
        id={fieldName}
        className={`select select-bordered h-10 min-h-0 w-full rounded-md text-sm font-normal ${className} ${
          errors[fieldName] ? 'border-red-400' : ''
        }`}
      >
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default SingleSelectInput;
