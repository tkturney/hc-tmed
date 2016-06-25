'use strict';

module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("Schedule", {
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      field: "Description",
      type: DataTypes.STRING
    },
    scheduleType: {
      field: "ScheduleType",
      type: DataTypes.STRING
    },
    startTime: {
      field: "StartTime",
      type: DataTypes.DATE
    },
    endTime: {
      field: "EndTime",
      type: DataTypes.DATE
    },
    monday: {
      field: "Monday",
      type: DataTypes.BOOLEAN
    },
    tuesday: {
      field: "Tuesday",
      type: DataTypes.BOOLEAN
    },
    wednesday: {
      field: "Wednesday",
      type: DataTypes.BOOLEAN
    },
    thursday: {
      field: "Thursday",
      type: DataTypes.BOOLEAN
    },
    friday: {
      field: "Friday",
      type: DataTypes.BOOLEAN
    },
    saturday: {
      field: "Saturday",
      type: DataTypes.BOOLEAN
    },
    sunday: {
      field: "Sunday",
      type: DataTypes.BOOLEAN
    },
    startOfMonth: {
      field: "StartOfMonth",
      type: DataTypes.BOOLEAN
    },
    middleOfMonth: {
      field: "MiddleOfMonth",
      type: DataTypes.BOOLEAN
    },
    endOfMonth: {
      field: "EndOfMonth",
      type: DataTypes.BOOLEAN
    },
    endOfQuarter: {
      field: "EndOfQuarter",
      type: DataTypes.BOOLEAN
    },
    endOfYear: {
      field: "EndOfYear",
      type: DataTypes.BOOLEAN
    },
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  return Schedule;

};
