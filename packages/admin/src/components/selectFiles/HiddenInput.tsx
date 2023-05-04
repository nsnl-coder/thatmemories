import { ChangeEvent } from 'react';

interface Props {
  selectFiles: (file: FileList) => void;
  id: string;
}

function HiddenInput(props: Props): JSX.Element {
  const { selectFiles, id } = props;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) selectFiles(e.target.files);
    if (e.target.value) {
      e.target.value = '';
    }
  };

  return (
    <input
      className="hidden"
      onChange={handleImageChange}
      type="file"
      id={id}
      accept="image/*,video/*"
      multiple
    />
  );
}

export default HiddenInput;
