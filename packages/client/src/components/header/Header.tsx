import GlobalNotification from './GlobalNotification';
import MainHeader from './MainHeader';
import SubHeader from './SubHeader';

function Header(): JSX.Element {
  return (
    <header>
      <GlobalNotification />
      <SubHeader />
      <MainHeader />
    </header>
  );
}

export default Header;
