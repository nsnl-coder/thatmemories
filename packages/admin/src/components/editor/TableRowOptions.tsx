import { Editor } from '@tiptap/react';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function TableRowOptions(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <ul className="bg-white px-2 shadow-lg">
      <DropdownItem
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().chain().focus().addRowBefore().run()}
      >
        Insert row above
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().chain().focus().addColumnAfter().run()}
      >
        Insert row below
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().chain().focus().deleteRow().run()}
      >
        Delete row
      </DropdownItem>
    </ul>
  );
}

export default TableRowOptions;
