/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /goals              ->  index
 * POST    /goals              ->  create
 * GET     /goals/:id          ->  show
 * PUT     /goals/:id          ->  update
 * DELETE  /goals/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function Goal(req){
  return req.app.get('models').Goal;
}

// Get list of goals
exports.index = function(req, res) {
  Goal(req)
    .findAll()
    .then(function (goals) {
      return res.status(200).json(goals);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single goal
exports.show = function(req, res) {
  Goal(req)
    .findById(req.params.id)
    .then(function (goal) {
      if(!goal) { return res.status(404).send('Not Found'); }
      return res.json(goal);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new goal in the DB.
exports.create = function(req, res) {
  Goal(req)
    .create(req.body)
    .then(function(goal) {
      return res.status(201).json(goal);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing goal in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Goal(req)
    .findById(req.params.id)
    .then(function (goal) {
      if(!goal) { return res.status(404).send('Not Found'); }
      var updated = _.merge(goal, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(goal);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a goal from the DB.
exports.destroy = function(req, res) {
  Goal(req)
    .findById(req.params.id)
    .then(function (goal) {
      if(!goal) { return res.status(404).send('Not Found'); }
      goal.remove(function(err) {
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
