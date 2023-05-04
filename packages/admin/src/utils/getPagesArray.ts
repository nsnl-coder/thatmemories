const getPagesArray = (
  currentPage: number,
  totalPages: number,
  displayRange: number = 4,
) => {
  let startPage = currentPage - displayRange;
  if (startPage < 1) startPage = 1;

  let endPage = startPage + 2 * displayRange;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - 2 * displayRange;
    if (startPage < 1) startPage = 1;
  }

  const pagesArray = [];
  for (let i = startPage; i <= endPage; i++) pagesArray.push(i);

  if (startPage >= 3) {
    pagesArray.unshift(1, '...');
  }
  if (endPage <= totalPages - 2) {
    pagesArray.push('...', totalPages);
  }

  return pagesArray;
};

export default getPagesArray;
