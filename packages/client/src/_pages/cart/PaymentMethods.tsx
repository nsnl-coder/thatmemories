import FilePreview from '@src/components/filePreview/FilePreview';
import { BsShieldFillCheck } from 'react-icons/bs';

function PaymentMethods(): JSX.Element {
  return (
    <div className="bg-base-100 px-6 py-4">
      <h3 className="text-2xl font-medium"> Payment methods </h3>
      <div className="flex gap-x-2 border-b py-4">
        <FilePreview
          src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145303968638--495c-b43f-68fc887d54d0.png"
          width={50}
          height={35}
          fill={false}
          className="h-9 w-16 object-contain"
        />
        <FilePreview
          src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145303968857--4ddf-809d-ba436a37ffd3.png"
          width={50}
          height={35}
          fill={false}
          className="h-9 w-16 object-contain"
        />
        <FilePreview
          src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145303969070--4b89-8070-0fc8c22f0a9b.png"
          width={50}
          height={35}
          fill={false}
          className="h-9 w-16 object-contain"
        />
        <FilePreview
          src="https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145303969576--4a2e-8520-119aa89c8194.png"
          width={50}
          height={35}
          fill={false}
          className="h-9 w-16 object-contain"
        />
      </div>
      <div className="py-4">
        <h3 className="text-2xl font-medium mb-3"> Buyer protection </h3>
        <div className="flex gap-x-4">
          <span className="mt-1">
            <BsShieldFillCheck />
          </span>
          Get full refund if the item is not as described or if is not delivered
        </div>
      </div>
    </div>
  );
}

export default PaymentMethods;
