function SubscribeForm(): JSX.Element {
  return (
    <div>
      <form className="flex mt-6 text-text-white">
        <input
          type="text"
          placeholder="Enter your email address"
          className="px-6 py-2.5 flex-grow w-0 outline-none text-text text-p1 max-w-sm"
        />
        <button
          type="button"
          className="px-6 text-center flex-shrink-0 hover:bg-base-100/30 flex-grow-0 border"
        >
          Subscribe
        </button>
      </form>
      <p className="text-text-white text-p2 mt-4">
        By subscribing you agree to our{' '}
        <span className="font-medium hover:underline">
          Terms & Conditions and Privacy & Cookies Policy.
        </span>
      </p>
    </div>
  );
}

export default SubscribeForm;
