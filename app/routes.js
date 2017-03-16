const handler = require('./handlers');
const UserRoutes = require('./routes/UserRoutes');

module.exports = function (app) {
  // #######################################
  // ##       Prefix route example        ##
  // #######################################

  app.use(`${process.env.URL_PREFIX}`, UserRoutes);

  app.use(handler);

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).json({
      error: 404,
      description: 'Not found',
      url: req.originalUrl,
    });
  });
};
