exports.checkTypeArr = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};

exports.generateUnique = () => {
  return new Date().getTime();
};
