import RowContainer from '@src/components/container/RowContainer';
import FilePreview from '@src/components/filePreview/FilePreview';
import { ObjectId } from '@src/types/objectId';
import { ICollection } from '@thatmemories/yup';
import CollectionHeading from './CollectionHeading';

interface Props {
  featuredCollections: ICollection[] | ObjectId[];
}

function FeaturedCollections(props: Props): JSX.Element | null {
  const { featuredCollections } = props;

  if (!featuredCollections || featuredCollections.length < 2) return null;

  const collection1 = featuredCollections[0];
  const collection2 = featuredCollections[1];

  if (!('_id' in collection1)) return null;
  if (!('_id' in collection2)) return null;

  return (
    <RowContainer className="py-8 md:py-12 border-b">
      <h2 className="uppercase text-h1 mb-8 font-medium md:text-center md:mb-12">
        Featured collections
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-28 gap-y-12">
        <div className="flex flex-col border md:border-none">
          <div className="relative aspect-[9/12]">
            {collection1.photo && (
              <FilePreview
                src={collection1.photo}
                fill
                sizes="(max-width: 768px) 100vw,50vw"
              />
            )}
          </div>
          <div className="px-4 py-4 md:px-0 md:py-0 md:mt-8">
            <CollectionHeading collection={collection1} />
          </div>
        </div>
        <div className="flex flex-col justify-between border rounded-sm md:border-none">
          <div className="relative aspect-square md:order-2">
            {collection2.photo && (
              <FilePreview
                fill
                src={collection2.photo}
                sizes="(max-width: 768px) 100vw,50vw"
              />
            )}
          </div>
          <div className="px-4 py-4 md:px-0 md:py-0">
            <CollectionHeading collection={collection2} />
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default FeaturedCollections;
