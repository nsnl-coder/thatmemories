import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';
import useBulkActions from '@src/hooks/useBulkActions';

import BulkActions from '@components/table/bulkActions/BulkActions';
import HeaderCheckBox from '@components/table/bulkActions/HeaderCheckBox';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import IsPinnedColumn from '@components/table/columns/IsPinnedColumn';
import PhotoColumn from '@components/table/columns/PhotoColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableLinkColumn from '@components/table/columns/TableLinkColumn';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';
import { IPopulatedProduct, IProduct } from '@thatmemories/yup';
import Link from 'next/link';

const ProductTable = (): JSX.Element => {
  const requestConfig = queryConfig.products;

  const {
    data: products,
    pagination,
    isLoading,
  } = useGetOnes<IPopulatedProduct[]>(requestConfig, {
    includeUrlQuery: true,
    additionalQuery: {
      fields: 'previewImages name isPinned collections slug status',
    },
  });

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(products);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={{
        singularName: 'product',
        pluralName: 'products',
        url: '/api/products',
      }}
    >
      <Toolbar />
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <th>Photo</th>
            <Thead fieldName="Name" sortBy="name" />
            <Thead fieldName="Pin?" sortBy="isPinned" />
            <Thead fieldName="Status" sortBy="status" />
            <Thead fieldName="collections" sortBy="collection" />
            <Thead fieldName="Slug" sortBy="slug" />
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product._id}
              onClick={() => toggleRowSelection(product._id)}
              className={
                !!product._id && checkedBoxesIds.includes(product._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={product._id}
              />
              <PhotoColumn
                id={product._id}
                requestConfig={queryConfig.products}
                s3Key={
                  product.previewImages?.length ? product.previewImages[0] : ''
                }
              />
              <TableLinkColumn
                _id={product._id}
                requestConfig={queryConfig.products}
                text={product.name}
              />
              <IsPinnedColumn
                requestConfig={requestConfig}
                isPinned={product.isPinned}
                id={product._id}
              />
              <StatusColumn
                id={product._id}
                requestConfig={requestConfig}
                status={product.status}
              />
              <td>
                {product.collections?.map((c) => (
                  <Link
                    href={`${queryConfig.collections.pluralName}/${c._id}`}
                    key={c._id}
                    className="badge badge-outline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {c.name}
                  </Link>
                ))}
              </td>
              <td>
                <p className="truncate w-40">{product.slug}</p>
              </td>
              <ActionsColumn requestConfig={requestConfig} id={product._id} />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
        />
      )}
    </TableWrapper>
  );
};

export default ProductTable;
