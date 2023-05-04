import { useRouter } from 'next/router';

interface Props {
  isSubmitting: boolean;
}

function SubmitBtn(props: Props): JSX.Element {
  const id = useRouter().query.id;
  const { isSubmitting } = props;

  return (
    <button
      type="submit"
      className={`${isSubmitting ? 'pointer-events-none opacity-70' : ''} btn`}
    >
      {id === 'create' ? 'Create' : 'Save'}
    </button>
  );
}

export default SubmitBtn;
