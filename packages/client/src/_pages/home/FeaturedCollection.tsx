import RowContainer from '@src/components/container/RowContainer';
import FilePreview from '@src/components/filePreview/FilePreview';
import Rating from '@src/components/rating/Rating';
import { ObjectId } from '@src/types/objectId';
import { ICollection } from '@thatmemories/yup';
import CollectionHeading from './CollectionHeading';

interface Props {
  featuredCollections: ICollection[] | ObjectId[];
}

function FeaturedCollection(props: Props): JSX.Element | null {
  const { featuredCollections } = props;

  if (!featuredCollections || featuredCollections.length < 3) return null;

  const collection = featuredCollections[2];

  if (!('_id' in collection)) return null;

  return (
    <RowContainer className="py-8 md:py-20 border-b">
      <div className="grid gap-y-6 md:grid-cols-2 gap-x-12 lg:gap-x-28">
        <div className="relative aspect-square">
          {collection.photo && (
            <FilePreview
              src={collection.photo}
              fill
              sizes="(max-width:768px) 100vw,50vw"
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-y-10">
          <CollectionHeading
            collection={collection}
            buttonText="Browse collection"
            buttonClassName="bg-neutral text-white"
          />
          <div className="border-t py-8">
            <div className="mb-12">
              <h4 className="font-medium mb-2">Recent reviews </h4>
              <Rating rating={4.5} ratingsCount={3000} />
            </div>
            <div>
              <p className="mb-2">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Quis ipsum suspendisse ultrices gravida. Petra van der
                Meer
              </p>
              <span className="font-medium text-sm">Petra van der Meer</span>
            </div>
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default FeaturedCollection;
