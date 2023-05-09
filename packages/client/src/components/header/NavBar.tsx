import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import { IMenu } from '@thatmemories/yup';
import ContactUsModal from '../uiContainer/ContactUsModal';
import NavItem from './NavItem';

interface Props {
  layout: 'horizontal' | 'vertical';
}

function NavBar(props: Props): JSX.Element | null {
  const { layout } = props;

  const { data: menus } = useGetOnes<IMenu[]>(queryConfig.menus, {
    includeUrlQuery: false,
    additionalQuery: {
      sort: 'ordering',
      position: 'header',
    },
  });

  if (!menus) return null;

  return (
    <nav>
      <div
        className={`flex ${
          layout === 'vertical' ? 'flex-col' : 'items-center'
        }`}
      >
        {menus.map((menu) => (
          <NavItem key={menu._id.toString()} menu={menu} />
        ))}
        <ContactUsModal />
      </div>
    </nav>
  );
}

export default NavBar;
