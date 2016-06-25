"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require('../config/environment');
var sequelize = new Sequelize(config.database, config.username, config.password, config.sql);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    // file = '/' + file + '/' + file + '.model.js';
    file = '/' + file + '/' + file + '.model.js';
    try {
      var model = sequelize["import"](path.join(__dirname, file));
      db[model.name] = model;
    } catch (error) {
      console.log('Error in Synch: ' + error.stack);
    }
  });

  // Set relationships

  // Tasks can belong to more than one group, and groups can belong to more than one task
  db['TaskGroup'].belongsToMany(db['Task'], {as: 'Tasks', through: 'TaskGrouping'});
  db['Task'].belongsToMany(db['TaskGroup'], {as: 'TaskGroups', through: 'TaskGrouping'});

  // Tasks can depend on other tasks
  db['Task'].belongsToMany(db['Task'], {as: 'Dependencies', through: 'TaskDependency'});

  // Tasks have at least one step
  db['Task'].hasMany(db['TaskStep'], {as: 'Steps'});
  db['TaskStep'].belongsTo(db['Task']);

  // Tasks can be referenced by many goals
  db['Task'].belongsToMany(db['Goal'], {as: 'TrainingGoals', through: 'TrainingGoal'});
  db['Goal'].hasOne(db['Task']);

  // A task has one schedule
  db['Task'].hasOne(db['Schedule']);

  // A task can be assigned to many resources, and vice-versa
  db['Task'].belongsToMany(db['Resource'], {as: 'AssignedResource', through: 'TaskAssignment'});
  db['Resource'].belongsToMany(db['Task'], {as: 'AssignedTasks', through: 'TaskAssignment'});

  // A resource can have many goals
  db['Resource'].belongsToMany(db['Goal'], {as: 'Goals', through: 'ResourceGoals'});
  db['Goal'].hasOne(db['Resource'], {as: 'Resource'});

  // A resource has one assigner
  db['Goal'].hasOne(db['Resource'], {as: 'AssignedBy'});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();
module.exports = db;
