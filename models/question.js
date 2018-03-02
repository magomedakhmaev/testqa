'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
    uuid: DataTypes.STRING
  });

  Question.associate = (models) => Question.hasMany(models.Answer);

  return Question;
};