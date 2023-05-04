import { HashLoader } from 'react-spinners';

function LoadingPage(): JSX.Element {
  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-base-100 z-50 flex items-center justify-center">
      <HashLoader color="#d492fc" />
    </div>
  );
}

export default LoadingPage;
