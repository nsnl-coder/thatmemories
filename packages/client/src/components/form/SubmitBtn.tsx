import { useRouter } from 'next/router';

interface Props {
  isUpdating: boolean;
}

function SubmitBtn(props: Props): JSX.Element {
  const id = useRouter().query.id;
  const { isUpdating } = props;

  return (
    <button
      type="submit"
      className={`${isUpdating ? 'pointer-events-none opacity-70' : ''} btn`}
    >
      {id === 'create' ? 'Create' : 'Save'}
    </button>
  );
}

export default SubmitBtn;
