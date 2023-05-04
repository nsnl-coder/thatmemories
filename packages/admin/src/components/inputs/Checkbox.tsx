import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';

interface Props {
  value: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  label?: string;
  fieldName: string;
}

function Checkbox(props: Props): JSX.Element {
  const { label, register, value, fieldName, control } = props;
  const { errors } = useFormState({ control });

  return (
    <div>
      <label className="flex items-center gap-x-3">
        <input
          className="checkbox checkbox-sm rounded-md"
          type="checkbox"
          {...register(fieldName)}
          value={value}
        />
        <span className="inline-block mt-0.5">{label}</span>
      </label>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default Checkbox;
