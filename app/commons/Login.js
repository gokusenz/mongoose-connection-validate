const UserCompanyModel = require('../models/UserCompanyModel');
const UserResumeModel = require('../models/UserResumeModel');

exports.getModel = (type) => {
  let model = new UserCompanyModel();
  if (type === 'resume') {
    model = new UserResumeModel();
  }
  return model;
};

exports.getUser = (params) => {
  const model = exports.getModel(params.type);
  const query = { username: params.username };
  const create = {
    username: params.username,
    password: params.password,
  };
  // console.log(model);
  return model.findOrCreate(query, create);
};
