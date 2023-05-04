import { Editor } from '@tiptap/react';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function TableColumnOptions(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <ul className="bg-white px-2 shadow-lg">
      <DropdownItem
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().chain().focus().addColumnBefore().run()}
      >
        Insert column before
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().chain().focus().addColumnAfter().run()}
      >
        Insert column after
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().chain().focus().deleteColumn().run()}
      >
        Delete column
      </DropdownItem>
    </ul>
  );
}

export default TableColumnOptions;
