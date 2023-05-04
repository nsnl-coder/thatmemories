import { useDragLayer, XYCoord } from 'react-dnd';
import ChildMenuMock from '../dragPreview/ChildMenuMock';

import Option from '@src/_pages/products/create/Option';
import Variant from '@src/_pages/products/create/Variant';
import { DRAG_TYPES } from '@src/types/enum';
import FilePreview from '../filePreview/FilePreview';

const CustomDragPreview = () => {
  const { isDragging, item, itemType, sourceOffset, pointerOffset } =
    useDragLayer((monitor) => ({
      isDragging: monitor.isDragging(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      sourceOffset: monitor.getSourceClientOffset(),
      pointerOffset: monitor.getClientOffset(),
    }));

  if (!isDragging) return null;

  let preview = null;

  switch (itemType) {
    case DRAG_TYPES.FILE:
      preview = (
        <div className="w-full h-full rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
          <FilePreview src={item.id} />
        </div>
      );
      break;
    case DRAG_TYPES.VARIANT:
      preview = (
        <Variant
          control={item.payload.control}
          index={item.payload.index}
          register={item.payload.register}
          remove={() => {}}
        />
      );
      break;
    case DRAG_TYPES.OPTION:
      preview = (
        <Option
          control={item.payload.control}
          index={item.payload.index}
          variantIndex={item.payload.variantIndex}
          register={item.payload.register}
          insert={() => {}}
          remove={() => {}}
        />
      );
      break;
    case DRAG_TYPES.MENU:
      preview = <ChildMenuMock menu={item.payload} />;
      break;
  }

  let width = item?.ref?.current?.offsetWidth || 0;
  let height = item?.ref?.current?.offsetHeight || 0;

  const styles = isDragging
    ? getStyles(sourceOffset, pointerOffset, width, height)
    : {};

  return (
    <div className="fixed pointer-events-none left-0 top-0 z-50">
      <div
        style={styles}
        className="shadow-2xl flex items-center justify-center"
      >
        {preview}
      </div>
    </div>
  );
};

function getStyles(
  sourceClientOffset: XYCoord | null,
  pointerOffset: XYCoord | null,
  width: number,
  height: number,
) {
  if (!sourceClientOffset || !pointerOffset || !width || !height) {
    return {
      display: 'none',
    };
  }

  let { x, y } = sourceClientOffset;
  const { x: pointerX, y: pointerY } = pointerOffset;

  // prevent point go outside of image
  if (x + width < pointerX || y + height < pointerY) {
    x = pointerX - width / 2;
    y = pointerY - height / 2;
  }

  //
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    width: width + 'px',
    height: height + 'px',
  };
}

export default CustomDragPreview;
