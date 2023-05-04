import useBulkActions from '@src/hooks/useBulkActions';

import useGetOnes from '@react-query/query/useGetOnes';
import queryConfig from '@react-query/queryConfig';

import FilePreview from '@components/filePreview/FilePreview';
import BulkActions from '@components/table/bulkActions/BulkActions';
import ActionsColumn from '@components/table/columns/ActionsColumn';
import CheckBoxColumn from '@components/table/columns/CheckBoxColumn';
import StatusColumn from '@components/table/columns/StatusColumn';
import TableLinkColumn from '@components/table/columns/TableLinkColumn';
import MultipleSelect from '@components/table/customFilter/MultipleSelect';
import TableWrapper from '@components/table/tableWrapper/TableWrapper';
import Thead from '@components/table/thead/Thead';
import Toolbar from '@components/table/toolbar/Toolbar';
import HeaderCheckBox from '@src/components/table/bulkActions/HeaderCheckBox';
import { IMenu } from '@thatmemories/yup';

const MenuTable = (): JSX.Element => {
  const requestConfig = queryConfig.menus;
  const {
    data: menus,
    pagination,
    isLoading,
  } = useGetOnes<IMenu[]>(requestConfig);

  const {
    handleCheckBoxChange,
    checkedBoxesIds,
    updateAllCheckBoxes,
    isCheckedAll,
    toggleRowSelection,
  } = useBulkActions(menus);

  return (
    <TableWrapper
      isLoading={isLoading}
      pagination={pagination}
      requestConfig={requestConfig}
    >
      <Toolbar>
        <MultipleSelect
          queryField="position"
          fieldValues={['header', 'footer']}
        />
        <MultipleSelect
          queryField="menuType"
          fieldValues={['root', 'nested']}
        />
      </Toolbar>
      <table className="shared-table">
        <thead>
          <tr>
            <HeaderCheckBox
              updateAllCheckBoxes={updateAllCheckBoxes}
              isChecked={isCheckedAll}
            />
            <th>Photo</th>
            <Thead fieldName="name" sortBy="name" />
            <Thead fieldName="menu type" sortBy="menuType" />
            <Thead fieldName="position" sortBy="position" />
            <Thead fieldName="ordering" sortBy="ordering" />
            <Thead fieldName="status" sortBy="status" />
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus?.map((menu) => (
            <tr
              key={menu._id}
              onClick={() => toggleRowSelection(menu._id)}
              className={
                !!menu._id && checkedBoxesIds.includes(menu._id)
                  ? 'selected-row'
                  : ''
              }
            >
              <CheckBoxColumn
                checkedBoxesIds={checkedBoxesIds}
                handleCheckBoxChange={handleCheckBoxChange}
                id={menu._id}
              />
              <td>
                {menu.photo && (
                  <div className="w-12 rounded-md overflow-hidden border ">
                    <FilePreview src={menu.photo} />
                  </div>
                )}
              </td>
              <TableLinkColumn
                _id={menu._id}
                requestConfig={queryConfig.menus}
                text={menu.name}
              />
              <td>{menu.menuType}</td>
              <td>{menu.position || '_'}</td>
              <td>{menu.ordering || '_'}</td>
              <StatusColumn
                requestConfig={requestConfig}
                status={menu.status}
                id={menu._id}
              />
              <td>
                <p className="truncate max-w-md">{menu.link}</p>
              </td>
              <ActionsColumn requestConfig={requestConfig} id={menu._id} />
            </tr>
          ))}
        </tbody>
      </table>
      {checkedBoxesIds.length > 0 && (
        <BulkActions
          checkedBoxesIds={checkedBoxesIds}
          requestConfig={requestConfig}
          uiControls={{ showPin: false, showActive: true, showDraft: true }}
        />
      )}
    </TableWrapper>
  );
};

export default MenuTable;
