import useGetOnes from '@src/react-query/query/useGetOnes';
import queryConfig from '@src/react-query/queryConfig';
import { IMenu } from '@thatmemories/yup';
import RowContainer from '../container/RowContainer';
import Logo from '../header/Logo';

function Footer(): JSX.Element | null {
  const { data: menus } = useGetOnes<IMenu[]>(queryConfig.menus, {
    includeUrlQuery: false,
    additionalQuery: {
      sort: 'ordering',
      position: 'footer',
    },
  });

  if (!menus || !menus.length) return null;

  return (
    <RowContainer className="bg-base-200">
      <footer className="footer py-10 text-text px-8 lg:px-0">
        <div>
          <Logo />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </div>
        {menus.map((menu) => (
          <div key={menu._id.toString()}>
            <span className="footer-title">{menu.name}</span>
            {menu.childMenus.map((cmenu) =>
              '_id' in cmenu ? (
                <a
                  key={cmenu._id.toString()}
                  className="link link-hover capitalize"
                >
                  {cmenu.name}
                </a>
              ) : null,
            )}
          </div>
        ))}
      </footer>
    </RowContainer>
  );
}

export default Footer;
