const request = require('./request');
const validate = require('../../resources/validate-message');

module.exports = (req, res, next) => {
  req.checkBody({
    username: {
      notEmpty: validate.notEmpty,
      isLength: validate.isLength(10),
      isInt: validate.isInt,
    },
    type: {
      notEmpty: validate.notEmpty,
      matches: validate.checkType(),
    },
  });
  request(req, res, next);
};
