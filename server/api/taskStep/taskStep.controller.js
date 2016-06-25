/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /taskSteps              ->  index
 * POST    /taskSteps              ->  create
 * GET     /taskSteps/:id          ->  show
 * PUT     /taskSteps/:id          ->  update
 * DELETE  /taskSteps/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function TaskStep(req){
  return req.app.get('models').TaskStep;
}

// Get list of taskSteps
exports.index = function(req, res) {
  TaskStep(req)
    .findAll()
    .then(function (taskSteps) {
      return res.status(200).json(taskSteps);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single taskStep
exports.show = function(req, res) {
  TaskStep(req)
    .findById(req.params.id)
    .then(function (taskStep) {
      if(!taskStep) { return res.status(404).send('Not Found'); }
      return res.json(taskStep);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new taskStep in the DB.
exports.create = function(req, res) {
  TaskStep(req)
    .create(req.body)
    .then(function(taskStep) {
      return res.status(201).json(taskStep);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing taskStep in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TaskStep(req)
    .findById(req.params.id)
    .then(function (taskStep) {
      if(!taskStep) { return res.status(404).send('Not Found'); }
      var updated = _.merge(taskStep, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(taskStep);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a taskStep from the DB.
exports.destroy = function(req, res) {
  TaskStep(req)
    .findById(req.params.id)
    .then(function (taskStep) {
      if(!taskStep) { return res.status(404).send('Not Found'); }
      taskStep.remove(function(err) {
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
