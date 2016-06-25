/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var taskGroup = require('./taskGroup.model');

exports.register = function(socket) {
  // taskGroup.schema.post('save', function (doc) {
  //   onSave(socket, doc);
  // });
  // taskGroup.schema.post('remove', function (doc) {
  //   onRemove(socket, doc);
  // });
}


function onSave(socket, doc, cb) {
  socket.emit('taskGroup:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('taskGroup:remove', doc);
}
