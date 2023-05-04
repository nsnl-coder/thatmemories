import { Control, UseFormRegister, useFormState } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';

interface CheckBoxProps {
  value: string;
  register: UseFormRegister<any>;
  name: string;
  fieldName: string;
}

interface Checkbox {
  name: string;
  value: string;
}

interface CheckBoxesProps extends LabelProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  options: string[] | Checkbox[];
}

function CheckBoxes(props: CheckBoxesProps): JSX.Element {
  const {
    register,
    control,
    fieldName,
    labelTheme,
    options,
    label,
    required = true,
  } = props;

  const { errors } = useFormState({ control });

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        required={required}
        labelTheme={labelTheme}
      />
      <div className="flex gap-x-8 gap-y-3 flex-wrap">
        {options.map((option) => {
          if (typeof option === 'string') {
            return (
              <Checkbox
                register={register}
                value={option}
                name={option}
                key={option}
                fieldName={fieldName}
              />
            );
          } else {
            return (
              <Checkbox
                register={register}
                value={option.value}
                name={option.name}
                key={option.value}
                fieldName={fieldName}
              />
            );
          }
        })}
      </div>
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

function Checkbox(props: CheckBoxProps): JSX.Element {
  const { name, register, value, fieldName } = props;

  return (
    <label className="flex items-center gap-x-3">
      <input
        className="checkbox checkbox-sm rounded-md"
        type="checkbox"
        {...register(fieldName)}
        value={value}
      />
      <span className="inline-block mt-0.5">{name}</span>
    </label>
  );
}

export default CheckBoxes;
