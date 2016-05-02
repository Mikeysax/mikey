const getParams = (form, fields) => {
  if(form === undefined) {
    return {};
  }
  let params = {};
  for (let field of fields) {
    const fieldValue = form[field];
    if(fieldValue) {
      params[field] = fieldValue.value;
    }
    else {
      params[field] = '';
    }
  }

  return params;
};

export default getParams;
