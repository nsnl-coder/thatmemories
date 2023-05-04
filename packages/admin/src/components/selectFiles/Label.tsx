interface Props {
  className?: string;
  htmlFor: string;
}

const Label = (props: Props) => {
  const { className, htmlFor } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={`${className} flex items-center justify-center flex-col rounded-lg cursor-pointer border border-dashed font-medium px-4 gap-y-3 hover:bg-gray-100`}
    >
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
        <span className="text-blue-800 px-4 py-0.5 rounded-md bg-slate-100 hover:text-black">
          Add file
        </span>
        {/* <button className="text-blue-800 underline hover:no-underline">
          Add from url
        </button> */}
      </div>
      <p className="text-center text-sm text-gray-500">
        Accepts images, videos
      </p>
    </label>
  );
};

export default Label;
