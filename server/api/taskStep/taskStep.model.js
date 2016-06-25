'use strict';

module.exports = function(sequelize, DataTypes) {
  var TaskStep = sequelize.define("TaskStep", {
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: "Description",
      type: DataTypes.STRING
    },
    sequence: {
      field: "Sequence",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      field: "Duration",
      type: DataTypes.DECIMAL(4, 2)
    },
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  return TaskStep;

};
