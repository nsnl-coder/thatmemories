import { Children } from '@src/types/shared';

interface Props extends Children {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isActive?: boolean;
  disabled?: boolean;
}

function ToolbarItem(props: Props): JSX.Element {
  const { onClick, isActive, children, disabled } = props;

  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 hover:bg-gray-100 rounded-sm cursor-pointer ${
        isActive ? 'bg-primary/10' : ''
      } ${disabled ? 'opacity-25' : ''}`}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
}

export default ToolbarItem;
