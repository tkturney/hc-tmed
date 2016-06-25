/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var resource = require('./resource.model');

exports.register = function(socket) {
  // resource.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // resource.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSave(socket, doc, cb) {
  socket.emit('resource:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('resource:remove', doc);
}
