/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var taskStep = require('./taskStep.model');

exports.register = function(socket) {
  // taskStep.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // taskStep.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSave(socket, doc, cb) {
  socket.emit('taskStep:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('taskStep:remove', doc);
}
