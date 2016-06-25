/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var task = require('./task.model');

exports.register = function(socket) {
  // task.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // task.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSave(socket, doc, cb) {
  socket.emit('task:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('task:remove', doc);
}
