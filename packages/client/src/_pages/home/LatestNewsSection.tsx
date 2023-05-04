import RowContainer from '@src/components/container/RowContainer';

function LatestNewsSection(): JSX.Element {
  return (
    <RowContainer className="py-20 border-t">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-h1 font-semibold mb-4"> Our Latest News </h2>
        <p className="text-text/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra vel facilisis.
        </p>
      </div>
    </RowContainer>
  );
}

export default LatestNewsSection;
