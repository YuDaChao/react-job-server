const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reactJob', {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    console.log('connect to %s error: ', err.message);
    process.exit(1)
  }
});

// models

require('./user');
require('./chat');

// 这里的model参数(User) 必须要和require('./user')中
// 的 mongoose.model('User', UserSchema) User对应
exports.User = mongoose.model('User');
exports.Chat = mongoose.model('Chat');
