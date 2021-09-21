const questions = require('./questions/questions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(questions);
};
