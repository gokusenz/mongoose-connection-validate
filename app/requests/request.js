const errMsgFormat = (err) => {
  const errMsg = {
    param: err.param,
    msg: `${err.param} ${err.msg}`,
  };
  return errMsg;
};

const callback = (result, res, next) => {
  if (result.isEmpty()) {
    next();
  } else {
    res.status(422).json(result.useFirstErrorOnly().array().map(errMsgFormat));
  }
};

module.exports = (req, res, next) => {
  req.getValidationResult().then((result) => {
    callback(result, res, next);
  });
};
