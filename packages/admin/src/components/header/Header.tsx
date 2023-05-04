import useLogOut from '@react-query/auth/useLogOut';

function Header(): JSX.Element {
  const { logout, isLoggingOut } = useLogOut();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-end px-12 mx-auto">
      <button
        onClick={() => logout()}
        type="button"
        className={`text-blue-600 hover:underline hover:text-blue-800 ${
          isLoggingOut ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
