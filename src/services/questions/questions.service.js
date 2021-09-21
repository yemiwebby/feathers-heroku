// Initializes the `Questions` service on path `/questions`
const { Questions } = require("./questions.class");
const createModel = require("../../models/questions.model");
const hooks = require("./questions.hooks");
const { seedQuestions } = require("./questions.seed");

module.exports = async function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/questions", new Questions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("questions");

  //get the total number of questions in the database
  const { total: totalQuestions } = await service.find({
    query: {
      $limit: 0,
    },
  });

  //seed the database if there are no questions saved
  if (totalQuestions === 0) {
    await seedQuestions.forEach((question) => {
      service.create(question);
    });
  }

  service.hooks(hooks);
};
