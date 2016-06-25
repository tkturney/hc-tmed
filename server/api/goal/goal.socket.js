/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var goal = require('./goal.model');

exports.register = function(socket) {
  // goal.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // goal.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}

function onSave(socket, doc, cb) {
  socket.emit('goal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('goal:remove', doc);
}
