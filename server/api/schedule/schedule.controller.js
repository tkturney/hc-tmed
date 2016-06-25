/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /schedules              ->  index
 * POST    /schedules              ->  create
 * GET     /schedules/:id          ->  show
 * PUT     /schedules/:id          ->  update
 * DELETE  /schedules/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function Schedule(req){
  return req.app.get('models').Schedule;
}

// Get list of schedules
exports.index = function(req, res) {
  Schedule(req)
    .findAll()
    .then(function (schedules) {
      return res.status(200).json(schedules);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single schedule
exports.show = function(req, res) {
  Schedule(req)
    .findById(req.params.id)
    .then(function (schedule) {
      if(!schedule) { return res.status(404).send('Not Found'); }
      return res.json(schedule);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new schedule in the DB.
exports.create = function(req, res) {
  Schedule(req)
    .create(req.body)
    .then(function(schedule) {
      return res.status(201).json(schedule);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing schedule in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Schedule(req)
    .findById(req.params.id)
    .then(function (schedule) {
      if(!schedule) { return res.status(404).send('Not Found'); }
      var updated = _.merge(schedule, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(schedule);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a schedule from the DB.
exports.destroy = function(req, res) {
  Schedule(req)
    .findById(req.params.id)
    .then(function (schedule) {
      if(!schedule) { return res.status(404).send('Not Found'); }
      schedule.remove(function(err) {
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
