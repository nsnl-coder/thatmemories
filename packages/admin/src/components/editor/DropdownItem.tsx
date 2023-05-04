interface Props {
  children: string;
  onClick: any;
  isActive?: boolean;
  disabled?: boolean;
}

function DropdownItem(props: Props): JSX.Element {
  const { children, onClick, isActive, disabled } = props;

  return (
    <li className={`bg-white py-0.5 flex flex-col items-start`}>
      <button
        onClick={onClick}
        type="button"
        className={`w-full  px-3 py-1.5 rounded-sm text-start whitespace-nowrap ${
          disabled ? 'opacity-50 pointer-events-none' : 'hover:bg-primary/25'
        }  ${isActive ? 'bg-primary/10' : ''}`}
      >
        {children}
      </button>
    </li>
  );
}

export default DropdownItem;
