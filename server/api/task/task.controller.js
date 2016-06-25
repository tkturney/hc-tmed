/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tasks              ->  index
 * POST    /tasks              ->  create
 * GET     /tasks/:id          ->  show
 * PUT     /tasks/:id          ->  update
 * DELETE  /tasks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function Task(req){
  return req.app.get('models').Task;
}

// Get list of tasks
exports.index = function(req, res) {
  Task(req)
    .findAll()
    .then(function (tasks) {
      return res.status(200).json(tasks);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single task
exports.show = function(req, res) {
  Task(req)
    .findById(req.params.id)
    .then(function (task) {
      if(!task) { return res.status(404).send('Not Found'); }
      return res.json(task);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new task in the DB.
exports.create = function(req, res) {
  var task = Task(req).build(req.body.task);
  task
    .save()
    .then(function() {
      task.setTaskGroups(req.body.taskGroups);
      return res.status(201).json(task);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing task in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  console.log('req.body._id: ' + req.body._id);
  Task(req)
    .findById(req.params.id)
    .then(function (task) {
      if(!task) { return res.status(404).send('Not Found'); }
      var updated = _.merge(task, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(task);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a task from the DB.
exports.destroy = function(req, res) {
  Task(req)
    .findById(req.params.id)
    .then(function (task) {
      if(!task) { return res.status(404).send('Not Found'); }
      task.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
