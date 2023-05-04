import { toastError } from '@src/utils/toast';
import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

function useAlertFormErrors(isSubmitted: boolean, errors: FieldErrors) {
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      toastError('Data validation failed');
    }
  }, [isSubmitted, errors]);
}

export default useAlertFormErrors;
