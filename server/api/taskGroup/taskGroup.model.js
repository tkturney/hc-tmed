'use strict';

//var socket = require('socket.io-client')('http://localhost:9000');

module.exports = function(sequelize, DataTypes) {
  var TaskGroup = sequelize.define("TaskGroup", {
    taskGroupID: {
      field: "TaskGroupID",
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
    modifiedBy: {
      field: "ModifiedBy",
      type: DataTypes.STRING
    }
  });

  // Uncomment to seed
  // TaskGroup
  //   .sync()
  //   .then(function (){
  //     return TaskGroup.create({
  //       name: 'Daily Processing',
  //       description: 'Tasks that occur on a regular, daily basis.',
  //       modifiedBy: 'tkturney'
  //     });
  //   })
  //   .then(function (){
  //     return TaskGroup.create({
  //       name: 'Merchant Processing',
  //       description: 'Tasks that are primarily focused on merchant activities.',
  //       modifiedBy: 'tkturney'
  //     });
  //   })
  //   .then(function (){
  //     return TaskGroup.create({
  //       name: 'Customer Processing',
  //       description: 'Tasks that are primarily focused on customer activities.',
  //       modifiedBy: 'tkturney'
  //     });
  //   });

  // Set hooks
  // TaskGroup.hook('afterDestroy', function() {
  //   TaskGroup.sync()
  //     .then(function (){
  //       socket.emit('taskGroup:destroy');
  //     });
  // });

  return TaskGroup;

};
