const getLocaleDateString = (date: Date | undefined) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export default getLocaleDateString;
