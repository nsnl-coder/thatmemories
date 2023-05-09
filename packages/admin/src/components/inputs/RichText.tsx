import { Control, useController, useFormState } from 'react-hook-form';

import Editor from '../editor/Editor';
import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';

interface Props extends LabelProps {
  control: Control<any, any>;
  defaultValue?: string | undefined;
}

function RichText(props: Props): JSX.Element {
  const { fieldName, control, required = false, label, labelTheme } = props;

  const errors = useFormState({ control });

  const { field } = useController({ control, name: fieldName });

  return (
    <div>
      <Label
        fieldName={fieldName}
        label={label || fieldName}
        labelTheme={labelTheme}
        required={required}
      />
      <Editor value={field.value} onChange={field.onChange} />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default RichText;
