import { ErrorMessage as Errors } from '@hookform/error-message';

interface Props {
  errors: any;
  fieldName: string;
}

function ErrorMessage(props: Props): JSX.Element | null {
  const { errors, fieldName } = props;

  return (
    <Errors
      errors={errors}
      name={fieldName}
      render={({ message }) => (
        <p className="text-sm text-red-400 mt-2">{message}</p>
      )}
    />
  );
}

export default ErrorMessage;
