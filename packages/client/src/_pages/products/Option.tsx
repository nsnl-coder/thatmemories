import FilePreview from '@src/components/filePreview/FilePreview';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { selectOption } from '@src/store/currentCartItem';
import { changeCurrentCarouselImage } from '@src/store/productCarousel';
import { IOption } from '@src/yup/productSchema';

interface Props {
  option: IOption;
  variantId: string;
}

function Option(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { option, variantId } = props;
  const selectedOptions = useAppSelector(
    (state) => state.currentCartItem.selectedOptions,
  );

  const selectedOptionsIds = selectedOptions.map((option) => option._id!) || [];

  const showVariantImg = () => {
    dispatch(changeCurrentCarouselImage(option.photo!));
  };

  const handleSelectOption = () => {
    dispatch(
      selectOption({
        ...option,
        variantId,
      }),
    );
  };

  return (
    <div
      className={`border border-gray-200 outline outline-2 cursor-pointer hover:outline-primary ${
        selectedOptionsIds.includes(option._id!)
          ? 'outline-primary'
          : ' outline-transparent'
      }`}
      onClick={handleSelectOption}
    >
      {option.photo && (
        <div
          onClick={() => showVariantImg()}
          className="w-14 md:w-16 cursor-pointer "
        >
          <FilePreview
            src={option.photo}
            fill={false}
            width={100}
            height={100}
          />
        </div>
      )}
      {!option.photo && (
        <div className="text-center px-3 md:px-4 py-0.5 cursor-pointer">
          {option.optionName}
        </div>
      )}
    </div>
  );
}

export default Option;
