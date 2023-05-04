import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { Children } from '@src/types/shared';

interface Payload {
  index: number;
  id: string;
}

interface Props extends Children {
  className?: string;
  isOverClassName?: string;
  payload?: any;
  itemType: string;
  swapOn: 'hover' | 'drop';
  swapBy: 'id' | 'index';
  disableGrayBg?: boolean;
  id: string;
  index: number;
  swapByIndex?: (index1: number, index2: number) => void;
  swapById?: (id1: string, id2: string) => void;
}

function SwapWrapper(props: Props): JSX.Element {
  const {
    id,
    index,
    children,
    className,
    payload,
    itemType,
    swapOn = 'hover',
    disableGrayBg,
    isOverClassName,
    swapById,
    swapByIndex,
    swapBy,
  } = props;

  const ref = useRef<null | HTMLDivElement>(null);

  // enable drag
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: itemType,
      item: {
        id,
        index,
        ref,
        payload,
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [ref, payload],
  );

  useEffect(() => {
    if (preview) preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // accept drop
  const [{ isOver }, drop] = useDrop<any, any, any>(
    () => ({
      accept: itemType,
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
      canDrop(item) {
        return item.id !== id;
      },
      hover(item) {
        if (item.id === id) return;
        if (swapOn !== 'hover') return;

        if (swapBy === 'id' && !!swapById) swapById(item.id, id);
        if (swapBy === 'index' && !!swapByIndex) swapByIndex(item.index, index);
      },
      drop(item) {
        if (item.id === id) return;
        if (swapOn !== 'drop') return;

        if (swapBy === 'id' && !!swapById) swapById(item.id, id);
        if (swapBy === 'index' && !!swapByIndex) swapByIndex(item.index, index);
      },
    }),
    [ref, swapById, swapByIndex, index, id, swapOn, swapBy],
  );

  return (
    <div
      ref={(node) => {
        drop(node);
        drag(node);
        ref.current = node;
      }}
      className={`relative ${className} z-20 ${isOver ? isOverClassName : ''}`}
      data-index={index}
    >
      {children}
      {isDragging && !disableGrayBg && (
        <div className="w-full h-full bg-gray-200 absolute top-0 left-0 z-20"></div>
      )}
    </div>
  );
}

export default SwapWrapper;
