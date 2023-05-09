import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';

import { Children } from '@src/types/shared';

interface Props extends LabelProps, Children {
  register: UseFormRegister<any>;
  type?: string;
  placeholder?: string;
  className?: string;
  control: Control<any>;
  readonly?: boolean;
}

function Input(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    label,
    placeholder,
    required,
    type = 'text',
    labelTheme,
    children,
    className,
    tooltip,
    control,
    readonly,
  } = props;

  const { errors } = useFormState({ control });

  return (
    <div className="w-full">
      <Label
        fieldName={fieldName}
        label={label}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <div className="flex gap-x-4">
        <input
          type={type}
          id={fieldName}
          {...register(fieldName)}
          className={`${className} ${
            readonly ? 'bg-gray-100 pointer-events-none' : ''
          } outline-none border h-10 px-3 w-full rounded-md placeholder:text-sm`}
          placeholder={placeholder}
        />
        {children}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Input;
