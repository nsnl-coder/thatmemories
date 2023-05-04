import { Editor } from '@tiptap/react';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function TableHeadOptions(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <ul className="bg-white px-2 shadow-lg">
      <DropdownItem
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().chain().focus().toggleHeaderColumn().run()}
      >
        Column to Header
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().chain().focus().toggleHeaderRow().run()}
      >
        Row to header
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().chain().focus().toggleHeaderCell().run()}
      >
        Cell to header
      </DropdownItem>
    </ul>
  );
}

export default TableHeadOptions;
