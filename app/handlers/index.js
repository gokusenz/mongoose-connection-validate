module.exports = (err, req, res, next) => {
  // treat as 404
  if (err.message
    && (err.message.includes('not found')
    || (err.message.includes('Cast to ObjectId failed')))) {
    return next();
  }

  if (err.stack.includes('ValidationError')) {
    res.status(422).json({
      error: 422,
      description: err.stack.TypeError,
    });
    return false;
  }

  res.status(500).json('500', {
    error: 500,
    // description: 'Internal Server Error'
    description: err.stack,
  });
  return false;
};
