import { UseFormRegister } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import Label, { LabelProps } from './Label';

import { Children } from '@src/types/shared';

interface Props extends LabelProps, Children {
  register: UseFormRegister<any>;
  errors: any;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

function Input(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    errors,
    label,
    placeholder,
    required,
    type = 'text',
    labelTheme,
    defaultValue,
    children,
    className,
    tooltip,
  } = props;

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <div className="flex gap-x-4">
        <input
          type={type}
          id={fieldName}
          {...register(fieldName)}
          className={`${className} border h-10 px-3 w-full rounded-md focus:border-primary placeholder:text-sm ${
            errors[fieldName] ? 'border border-red-400' : ''
          }`}
          placeholder={placeholder || fieldName}
          defaultValue={defaultValue}
        />
        {children}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Input;
