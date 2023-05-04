import { AiFillQuestionCircle } from 'react-icons/ai';

interface Props {
  dataTip?: string;
}

function Tooltip(props: Props): JSX.Element | null {
  if (!props.dataTip) return null;

  return (
    <span className="tooltip tooltip-top" data-tip={props.dataTip}>
      <AiFillQuestionCircle />
    </span>
  );
}

export default Tooltip;
