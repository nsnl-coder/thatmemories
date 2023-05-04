import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function CommonLayout(props: Props): JSX.Element {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-50 flex-grow h-screen flex-col flex">
        <div className="h-16">
          <Header />
        </div>
        <div className="flex-grow overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
}

export default CommonLayout;
