const UserLogin = require('../commons/Login');

exports.login = (req, res) => {
  const params = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
  };
  return UserLogin.getUser(params)
  .then((result) => {
    const json = {
      user_id: result._id,
      username: result.username,
      password: result.password,
      type: params.type,
    };
    res.status(200).json(json);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};
