import { useEffect, useState } from 'react';
import { Control, useController, useFormState } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';
import Label, { LabelProps } from '../form/Label';
import SelectFiles, { SelectFilesProps } from '../selectFiles/SelectFiles';

interface Props
  extends Omit<SelectFilesProps, 'setFiles' | 'files'>,
    LabelProps {
  control: Control<any>;
  className?: string;
}

function FilesInput(props: Props): JSX.Element {
  const {
    fieldName,
    label,
    control,
    maxFilesCount,
    labelTheme,
    className,
    required = false,
    allowedTypes,
    showUploadLabel = true,
    tooltip,
  } = props;

  const { errors } = useFormState({ control });
  const { field } = useController({ name: fieldName, control });

  const setFiles = (fn: (files: string[]) => string[]) => {
    const updatedFiles = fn(files);

    if (maxFilesCount === 1) {
      field.onChange(updatedFiles.at(-1));
      return;
    }

    field.onChange(updatedFiles);
  };

  let files = field.value || [];

  if (typeof field.value === 'string') {
    files = [files];
  }

  return (
    <div className={className}>
      <Label
        fieldName={fieldName}
        label={label}
        labelTheme={labelTheme}
        required={required}
        tooltip={tooltip}
      />
      <SelectFiles
        allowedTypes={allowedTypes}
        files={files}
        setFiles={setFiles}
        maxFilesCount={maxFilesCount}
        fieldName={fieldName}
        showUploadLabel={showUploadLabel}
      />
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </div>
  );
}

export default FilesInput;
