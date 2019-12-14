// eslint-disable-next-line import/prefer-default-export
export const generateQuery = (query, category) => {
  let parameter = ``;
  if (query) {
    parameter += `?query=${query}`;
  }
  if (category && category.length > 0) {
    if (parameter === '') {
      parameter = '?';
    } else {
      parameter += '&';
    }
    parameter += `category=${category}`;
  }
  return parameter;
};
