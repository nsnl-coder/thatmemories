import { Editor } from '@tiptap/react';
import { AiOutlineClear, AiOutlineEnter, AiOutlineStrikethrough } from 'react-icons/ai';
import { BsFillFileCodeFill, BsImages, BsListOl } from 'react-icons/bs';
import { FaMarker, FaRedo, FaUndo } from 'react-icons/fa';
import { GrBlockQuote } from 'react-icons/gr';
import { HiOutlineListBullet } from 'react-icons/hi2';
import { MdHorizontalRule } from 'react-icons/md';
import { RiBold, RiItalic } from 'react-icons/ri';
//
import Heading from './Heading';
import Table from './Table';
import ToolbarItem from './ToolbarItem';

import useSelectFromGallery from '@src/hooks/useSelectFromGallery';
import getS3FileUrl from '@src/utils/getFileUrl';
import imageOrVideo from '@src/utils/imageOrVideo';

interface Props {
  editor: Editor | null;
}

const Toolbar = (props: Props) => {
  const { editor } = props;

  const { selectFromGallery } = useSelectFromGallery();

  if (!editor) {
    return null;
  }

  const handleAddImage = async () => {
    const files = await selectFromGallery(1, '*');
    if (files.length === 0) return;
    if (imageOrVideo(files[0]) === 'video') return;
    editor
      .chain()
      .focus()
      .setImage({
        src: getS3FileUrl(files[0]),
        alt: 'demonstration',
      })
      .run();
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2 px-4 py-2 border-b bg-gray-50 border-gray-400/80 rounded-md">
      <ToolbarItem
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <RiBold size={20} />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <RiItalic size={19} />
      </ToolbarItem>

      <ToolbarItem
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <AiOutlineStrikethrough size={20} />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <HiOutlineListBullet size={26} />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <BsListOl size={23} />
      </ToolbarItem>

      <Heading editor={editor} />
      <Table editor={editor} />

      <ToolbarItem
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <GrBlockQuote />
      </ToolbarItem>

      <ToolbarItem
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      >
        <BsFillFileCodeFill size={20} />
      </ToolbarItem>

      <ToolbarItem
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('codeBlock')}
      >
        <FaMarker />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule size={24} />
      </ToolbarItem>
      <ToolbarItem onClick={() => editor.chain().focus().setHardBreak().run()}>
        <AiOutlineEnter size={20} />
      </ToolbarItem>
      <ToolbarItem
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run();
          editor.chain().focus().clearNodes().run();
        }}
      >
        <AiOutlineClear size={20} />
      </ToolbarItem>
      <ToolbarItem onClick={handleAddImage}>
        <BsImages size={18} />
      </ToolbarItem>
    </div>
  );
};

export default Toolbar;
