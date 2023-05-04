import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import SideBar from '../header/SideBar';
import Newletter from '../newsletter/NewsLetter';

interface Props {
  children: JSX.Element;
}

function CommonLayout(props: Props): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      document
        .querySelector('.drawer-content')
        ?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="drawer">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content max-w-full overflow-hidden flex flex-col justify-between">
        <div>
          <Header />
          {props.children}
        </div>
        <div>
          <Newletter />
          <Footer />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="side-drawer" className="drawer-overlay"></label>
        <div className=" p-4 w-80 bg-base-100 text-base-content">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default CommonLayout;
