const Chat = require('../proxy').Chat;

module.exports = function (server) {
  const io = require('socket.io')(server);
  io.on('connect', function (socket) {
    socket.on('sendMsg', function ({from, to, content}) {
      // 准备数据
      const chat_id = [from, to].sort().join('_');
      const create_time = new Date();

      // 保存数据
      Chat.saveMsg(from, to, content, chat_id, create_time, function (err, msg) {
        if (!err) {
          // 向客户端发消息
          io.emit('receiveMsg', msg)
        }
      });
    })
  })
};
