import { ICollection } from '@thatmemories/yup';
import Link from 'next/link';
import { HiArrowLongRight } from 'react-icons/hi2';

interface Props {
  collection: ICollection;
  buttonText?: string;
  buttonClassName?: string;
}

function CollectionHeading(props: Props): JSX.Element {
  const {
    collection,
    buttonText = 'Shop now',
    buttonClassName = 'border-primary text-primary hover:bg-primary hover:text-white',
  } = props;

  return (
    <div>
      <span className="uppercase text-xs font-medium">New collection</span>
      <h3 className="text-4xl font-medium mb-4 capitalize">
        {collection.display_name}
      </h3>
      <p className="mb-8">{collection.description}</p>
      <Link
        href="/"
        className={`border uppercase text-sm  w-fit px-6 py-2 flex items-center gap-x-2 rounded-sm ${buttonClassName}`}
      >
        <span className="font-medium">{buttonText}</span>
        <HiArrowLongRight />
      </Link>
    </div>
  );
}

export default CollectionHeading;
