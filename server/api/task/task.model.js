'use strict';

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    taskID: {
      field: "TaskID",
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: "Description",
      type: DataTypes.STRING
    },
    isOnRunsheet: {
      field: "IsOnRunsheet",
      type: DataTypes.BOOLEAN
    },
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  return Task;

};
