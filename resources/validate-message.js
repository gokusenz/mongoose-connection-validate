exports.notEmpty = { errorMessage: 'is required.' };
exports.isDate = { errorMessage: 'must be date format (yyyy-mm-dd).' };
exports.isInt = { errorMessage: 'must be only numeric' };

exports.isLength = max => ({
  options: [{ max }],
  errorMessage: `must be less than ${max}`,
});
exports.checkType = () => ({
  options: [/(^company$|^resume$)/i],
  errorMessage: 'must be resume or company',
});
