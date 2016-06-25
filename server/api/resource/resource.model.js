'use strict';

module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define("Resource", {
    firstName: {
      field: "FirstName",
      type: DataTypes.STRING
    },
    lastName: {
      field: "LastName",
      type: DataTypes.STRING
    },
    scheduleID: {
      field: "ScheduleID",
      type: DataTypes.INTEGER
    },
    contactNumber: {
      field: "ContactNumber",
      type: DataTypes.STRING
    },
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  return Resource;

};
