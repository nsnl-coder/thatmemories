import { Editor } from '@tiptap/react';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function TableOptions(props: Props): JSX.Element {
  const { editor } = props;

  return (
    <ul className="bg-white px-2 shadow-lg">
      <DropdownItem
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run()
        }
      >
        Insert table
      </DropdownItem>
      <DropdownItem
        disabled={!editor.can().chain().focus().deleteTable().run()}
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        Delete table
      </DropdownItem>
    </ul>
  );
}

export default TableOptions;
