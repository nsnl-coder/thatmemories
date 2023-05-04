import { Editor } from '@tiptap/react';
import { BiTable } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import WithNestedMenu from '../menu/WithNestedMenu';
import TableCellOptions from './TableCellOptions';
import TableColumnOptions from './TableColumnOptions';
import TableHeadOptions from './TableHeadOptions';
import TableOptions from './TableOptions';
import TableRowOptions from './TableRowOptions';

interface Props {
  editor: Editor;
}

function Table(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className=" hover:bg-primary/10 cursor-pointer px-2 py-1.5 rounded-sm flex items-center gap-x-2"
      >
        <BiTable size={20} />
        <BsChevronDown size={14} className="text-gray-500" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content w-40 bg-white rounded-sm shadow-md mt-1 p-2"
      >
        <WithNestedMenu textContent="table">
          <TableOptions editor={editor} />
        </WithNestedMenu>
        <WithNestedMenu textContent="header">
          <TableHeadOptions editor={editor} />
        </WithNestedMenu>
        <WithNestedMenu textContent="row">
          <TableRowOptions editor={editor} />
        </WithNestedMenu>
        <WithNestedMenu textContent="column">
          <TableColumnOptions editor={editor} />
        </WithNestedMenu>
        <WithNestedMenu textContent="cell">
          <TableCellOptions editor={editor} />
        </WithNestedMenu>
      </ul>
    </div>
  );
}

export default Table;
