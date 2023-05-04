import Link from 'next/link';

function ErrorMessage(): JSX.Element {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="font-medium mb-16 border p-12 text-xl space-y-3">
        <p> You are not an admin!</p>
        <a
          href={process.env.NEXT_PUBLIC_HOME_PAGE}
          className="text-blue-400 underline block"
        >
          Visit our website by clicking this link!
        </a>
        <div>
          or{' '}
          <Link className="text-blue-400 underline" href="/auth/login">
            Login again with admin account!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
