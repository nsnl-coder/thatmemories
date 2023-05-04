import NavItem from './NavItem';

interface Props {
  layout: 'horizontal' | 'vertical';
}

function NavBar(props: Props): JSX.Element {
  const { layout } = props;
  return (
    <nav>
      <ul className={`flex ${layout === 'vertical' ? 'flex-col' : ''}`}>
        <NavItem />
        <NavItem />
        <NavItem />
        <NavItem />
        <NavItem />
      </ul>
    </nav>
  );
}

export default NavBar;
