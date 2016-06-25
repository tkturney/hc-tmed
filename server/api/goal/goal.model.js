'use strict';

module.exports = function(sequelize, DataTypes) {
  var Goal = sequelize.define("Goal", {
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: "Description",
      type: DataTypes.STRING
    },
    goalStarted: {
      field: "GoalStarted",
      type: DataTypes.DATE
    },
    goalCompleted: {
      field: "GoalCompleted",
      type: DataTypes.DATE
    },
    goalDue: {
      field: "GoalDue",
      type: DataTypes.DATE,
    },
    goalComplete: {
      field: "GoalComplete",
      type: DataTypes.BOOLEAN
    },
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  return Goal;

};
