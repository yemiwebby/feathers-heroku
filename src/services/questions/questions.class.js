const { Service } = require("feathers-nedb");

exports.Questions = class Questions extends Service {
  create(data, params) {
    const { question, correctAnswer, difficulty } = data;
    const quizData = { question, correctAnswer, difficulty };
    return super.create(quizData, params);
  }
};
