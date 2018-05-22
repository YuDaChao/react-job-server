const models = require('../models');
const Chat = models.Chat;

/**
 * 获取用户相关的聊天记录
 * @param userId
 * @param filter
 * @param callback
 */
exports.getChatsByUserId = function (userId, filter, callback) {
  Chat.find({"$or": [{from: userId}, {to: userId}]}, filter, callback)
};

/**
 * 修改聊天记录已读状态
 * @param from
 * @param to
 * @param read
 * @param callback
 */
exports.updateChatStatusByUserId = function (from, to, read, callback) {
  Chat.update({from, to, read: false}, read, {multi: true}, callback)
};

/**
 * 保存聊天信息
 * @param from
 * @param to
 * @param content
 * @param charId
 * @param createTime
 * @param callback
 */
exports.saveMsg = function (from, to, content, charId, createTime, callback) {
  const chat = new Chat();
  chat.from        = from;
  chat.to          = to;
  chat.content     = content;
  chat.chat_id     = charId;
  chat.create_time = createTime;
  chat.save( callback)
};
