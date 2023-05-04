import { useState } from 'react';

const useControlModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let modalClassName = isOpen ? 'modal-open modal' : 'modal';

  const closeModal = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return {
    modalClassName,
    closeModal,
    toggleModal,
    openModal,
    isOpen,
  };
};

export default useControlModal;
