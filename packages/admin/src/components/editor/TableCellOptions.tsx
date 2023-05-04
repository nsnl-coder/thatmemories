import { Editor } from '@tiptap/react';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function TableCellOptions(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <ul className="bg-white px-2 shadow-lg">
      <DropdownItem
        onClick={() => editor.chain().focus().mergeCells().run()}
        disabled={!editor.can().chain().focus().mergeCells().run()}
      >
        Merge Cell
      </DropdownItem>
      <DropdownItem
        onClick={() => editor.chain().focus().splitCell().run()}
        disabled={!editor.can().chain().focus().splitCell().run()}
      >
        Unmerge Cell
      </DropdownItem>
    </ul>
  );
}

export default TableCellOptions;
