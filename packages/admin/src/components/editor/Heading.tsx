import { Editor } from '@tiptap/react';
import { BsChevronDown } from 'react-icons/bs';
import DropdownItem from './DropdownItem';

interface Props {
  editor: Editor;
}

function Dropdown(props: Props): JSX.Element {
  const { editor } = props;

  const isH1Active = editor.isActive('heading', { level: 1 });
  const isH2Active = editor.isActive('heading', { level: 2 });
  const isH3Active = editor.isActive('heading', { level: 3 });
  const isH4Active = editor.isActive('heading', { level: 4 });
  const isH5Active = editor.isActive('heading', { level: 5 });
  const isH6Active = editor.isActive('heading', { level: 6 });
  const isParagraphActive = editor.isActive('paragraph');

  let textContent = 'Paragraph';
  textContent = isH1Active ? 'Heading 1' : textContent;
  textContent = isH2Active ? 'Heading 2' : textContent;
  textContent = isH3Active ? 'Heading 3' : textContent;
  textContent = isH4Active ? 'Heading 4' : textContent;
  textContent = isH5Active ? 'Heading 5' : textContent;
  textContent = isH6Active ? 'Heading 6' : textContent;

  return (
    <div className="dropdown dropdown-start">
      <label
        tabIndex={0}
        className="bg-gray-100 hover:bg-primary/10 cursor-pointer px-4 py-1 rounded-sm flex items-center gap-x-2"
      >
        {textContent}
        <BsChevronDown size={14} className="text-gray-500" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content px-2 py-1 space-y-1 bg-white shadow-lg"
      >
        <DropdownItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={isParagraphActive}
        >
          paragraph
        </DropdownItem>

        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={isH1Active}
        >
          Heading 1
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={isH2Active}
        >
          Heading 2
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={isH3Active}
        >
          Heading 3
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={isH4Active}
        >
          Heading 4
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          isActive={isH5Active}
        >
          Heading 5
        </DropdownItem>
        <DropdownItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          isActive={isH6Active}
        >
          Heading 6
        </DropdownItem>
      </ul>
    </div>
  );
}

export default Dropdown;
