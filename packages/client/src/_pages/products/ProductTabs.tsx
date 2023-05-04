import RenderHtml from '@src/components/renderHtml/RenderHtml';
import { useState } from 'react';

interface Props {
  description: string | undefined;
  shippingPolicy: string | undefined;
  reviews: any;
}

type Tab = 'description' | 'reviews' | 'shippingPolicy' | 'returnPolicy';

function ProductTabs(props: Props): JSX.Element | null {
  const { description, shippingPolicy, reviews } = props;
  const [currentTab, setCurrentTab] = useState<Tab>('description');

  if (!description && !shippingPolicy && !reviews) {
    return null;
  }

  return (
    <div className="pt-8 md:pt-16">
      <div className="flex gap-x-6 md:gap-x-12 text-xl font-medium border-b py-4">
        {description && (
          <span
            onClick={() => setCurrentTab('description')}
            className={`${
              currentTab === 'description' ? '' : 'opacity-40'
            } cursor-pointer`}
          >
            Description
          </span>
        )}
        <span
          onClick={() => setCurrentTab('reviews')}
          className={`${
            currentTab === 'reviews' ? '' : 'opacity-40'
          } cursor-pointer`}
        >
          Reviews
        </span>
        {shippingPolicy && (
          <span
            onClick={() => setCurrentTab('shippingPolicy')}
            className={`${
              currentTab === 'shippingPolicy' ? '' : 'opacity-40'
            } cursor-pointer`}
          >
            Shipping
          </span>
        )}
      </div>
      <div className="mt-8 flex">
        {currentTab === 'description' && <RenderHtml html={description} />}
        <div className="hidden lg:block w-80 flex-shrink-0"></div>
      </div>
    </div>
  );
}

export default ProductTabs;
