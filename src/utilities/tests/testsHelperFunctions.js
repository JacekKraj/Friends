export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const formikFindByInputName = (wrapper, name) => {
  return wrapper.find(`input[name='${name}']`);
};

export const formikFindBySelectName = (wrapper, name) => {
  return wrapper.find(`select[name='${name}']`);
};
