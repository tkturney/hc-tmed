/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /taskGroups              ->  index
 * POST    /taskGroups              ->  create
 * GET     /taskGroups/:id          ->  show
 * PUT     /taskGroups/:id          ->  update
 * DELETE  /taskGroups/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function TaskGroup(req){
  return req.app.get('models').TaskGroup;
}

// Get list of taskGroups
exports.index = function(req, res) {
  TaskGroup(req)
    .findAll()
    .then(function (taskGroups) {
      return res.status(200).json(taskGroups);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single taskGroup
exports.show = function(req, res) {
  TaskGroup(req)
    .findById(req.params.id)
    .then(function (taskGroup) {
      if(!taskGroup) { return res.status(404).send('Not Found'); }
      return res.json(taskGroup);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new taskGroup in the DB.
exports.create = function(req, res) {
  TaskGroup(req)
    .create(req.body)
    .then(function(taskGroup) {
      return res.status(201).json(taskGroup);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing taskGroup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  console.log('req.body._id: ' + req.body._id);
  TaskGroup(req)
    .findById(req.params.id)
    .then(function (taskGroup) {
      if(!taskGroup) { return res.status(404).send('Not Found'); }
      var updated = _.merge(taskGroup, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(taskGroup);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a taskGroup from the DB.
exports.destroy = function(req, res) {
  TaskGroup(req)
    .findById(req.params.id)
    .then(function (taskGroup) {
      if(!taskGroup) { return res.status(404).send('Not Found'); }
      taskGroup.destroy(function(err) {
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
