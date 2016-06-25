/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /resources              ->  index
 * POST    /resources              ->  create
 * GET     /resources/:id          ->  show
 * PUT     /resources/:id          ->  update
 * DELETE  /resources/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function Resource(req){
  return req.app.get('models').Resource;
}

// Get list of resources
exports.index = function(req, res) {
  Resource(req)
    .findAll()
    .then(function (resources) {
      return res.status(200).json(resources);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single resource
exports.show = function(req, res) {
  Resource(req)
    .findById(req.params.id)
    .then(function (resource) {
      if(!resource) { return res.status(404).send('Not Found'); }
      return res.json(resource);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new resource in the DB.
exports.create = function(req, res) {
  Resource(req)
    .create(req.body)
    .then(function(resource) {
      return res.status(201).json(resource);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing resource in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Resource(req)
    .findById(req.params.id)
    .then(function (resource) {
      if(!resource) { return res.status(404).send('Not Found'); }
      var updated = _.merge(resource, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(resource);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a resource from the DB.
exports.destroy = function(req, res) {
  Resource(req)
    .findById(req.params.id)
    .then(function (resource) {
      if(!resource) { return res.status(404).send('Not Found'); }
      resource.remove(function(err) {
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
