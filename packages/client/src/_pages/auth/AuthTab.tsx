import NavLink from '@components/navLink/NavLink';

function AuthTab(): JSX.Element {
  return (
    <div className="uppercase font-semibold py-12 flex justify-center gap-x-8">
      <NavLink
        href="/auth/login"
        className="text-black/25"
        activeClassName="!text-black"
      >
        Login
      </NavLink>
      <NavLink
        href="/auth/register"
        className="text-black/25"
        activeClassName="!text-black"
      >
        Register
      </NavLink>
    </div>
  );
}

export default AuthTab;
