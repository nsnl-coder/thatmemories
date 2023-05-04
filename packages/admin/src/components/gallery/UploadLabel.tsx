interface Props {
  className?: string;
  htmlFor: string;
}

const UploadLabel = (props: Props) => {
  const { className, htmlFor } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={`${className} bg-gray-50 flex items-center h-48 justify-center flex-col rounded-lg cursor-pointer border shadow-lg font-medium px-4 gap-y-3 hover:bg-gray-100`}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
        <span className="text-blue-800 px-4 rounded-md bg-slate-100 hover:text-black">
          Add file
        </span>
      </div>
      <p className="text-center text-sm text-gray-500">
        Accepts images, videos
      </p>
    </label>
  );
};

export default UploadLabel;
