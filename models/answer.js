'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
      questionId: DataTypes.INTEGER,
      answer: DataTypes.STRING
  });

  Answer.associate = (models) => Answer.belongsTo(models.Question, {foreignKey: 'questionId'});

  return Answer;
};

