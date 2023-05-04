import RowContainer from '../container/RowContainer';
import SubscribeForm from './SubscribeForm';

function NewsLetter(): JSX.Element {
  return (
    <RowContainer className="bg-neutral">
      <div className="text-neutral-content flex py-20 flex-wrap lg:flex-nowrap w-full gap-x-40 gap-y-16 px-8 lg:px-0">
        <div className="w-full lg:w-1/2">
          <h3 className="text-h2 font-medium leading-tight mb-4">
            Get our emails for info on new items, sales and more.
          </h3>
          <p>
            We will email you a voucher worth £10 off your first order over £50.
          </p>
          <SubscribeForm />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-h2 font-medium leading-tight">
            Need help? (+800) 1234 5678 90
          </h3>
          <p>We are available 8:00am – 7:00pm</p>
        </div>
      </div>
    </RowContainer>
  );
}

export default NewsLetter;
