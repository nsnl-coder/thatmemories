import Tooltip from './Tooltip';

type LabelThemes = 'light' | 'bold';

interface LabelProps {
  labelTheme: LabelThemes;
  required?: boolean;
  label?: string;
  fieldName: string;
  tooltip?: string;
}

function Label(props: LabelProps): JSX.Element {
  const {
    fieldName,
    tooltip,
    required = false,
    labelTheme = 'light',
    label,
  } = props;

  return (
    <div
      className={`flex gap-x-3 items-center ${
        labelTheme === 'light' ? 'mb-3' : 'mb-6'
      }`}
    >
      <label
        htmlFor={fieldName}
        className={`${
          labelTheme === 'light'
            ? 'flex gap-x-1 text-sm'
            : 'font-semibold text-lg capitalize block'
        }`}
      >
        <span>{label || fieldName}</span>
        {required && <span className="text-error">*</span>}
      </label>
      {tooltip && <Tooltip dataTip={tooltip} />}
    </div>
  );
}

export default Label;
export type { LabelThemes, LabelProps };
