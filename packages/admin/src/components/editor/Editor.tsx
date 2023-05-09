import { useEffect } from 'react';

import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

//
import Toolbar from './Toolbar';

interface Props {
  value: string;
  onChange: any;
}

const Editor = (props: Props) => {
  const { onChange, value } = props;

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        allowBase64: false,
      }),
    ],
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    let html = editor?.getHTML();

    if ((html === '<p></p>' && value) || html !== value) {
      editor?.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-400/80 rounded-md">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
