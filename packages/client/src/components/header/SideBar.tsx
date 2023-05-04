import Logo from './Logo';
import NavBar from './NavBar';

function SideBar(): JSX.Element {
  return (
    <div className="max-w-full overflow-hidden">
      <div className="px-4 py-3">
        <Logo />
      </div>
      <NavBar layout="vertical" />
    </div>
  );
}

export default SideBar;
