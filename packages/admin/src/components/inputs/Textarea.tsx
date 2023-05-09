import { Control, UseFormRegister, useFormState } from 'react-hook-form';

import { Children } from '@src/types/shared';

import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';

interface Props extends LabelProps, Children {
  register: UseFormRegister<any>;
  control: Control<any>;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}

function Textarea(props: Props): JSX.Element {
  const {
    fieldName,
    register,
    label,
    placeholder,
    required,
    labelTheme,
    defaultValue,
    children,
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
      />
      <div className="flex gap-x-4">
        <textarea
          id={fieldName}
          {...register(fieldName)}
          className="border border-gray-400/80 h-32 p-2 w-full rounded-md placeholder:text-sm outline-none"
          placeholder={placeholder || fieldName}
          defaultValue={defaultValue}
        />
        {children}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Textarea;
