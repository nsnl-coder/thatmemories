import useResendVerifyEmail from '@react-query/auth/useResendVerifyEmail';

function ResendEmailButton(): JSX.Element {
  const { resendEmail } = useResendVerifyEmail();

  return (
    <button
      type="button"
      className="px-6 py-2 bg-primary text-white rounded-md mt-4"
      onClick={() => resendEmail()}
    >
      Resend verify email!
    </button>
  );
}

export default ResendEmailButton;
