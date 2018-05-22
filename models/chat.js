const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  from: { type: String, required: true }, // 发送用户id
  to: { type: String, required: true }, // 接受用户id
  chat_id: { type: String, required: true }, // from 和 to组成的id
  content: { type: String, required: true }, // 内容
  read: { type: Boolean, default: false }, // 是否已读
  create_time: { type: Number } // 创建时间
});

mongoose.model('Chat', ChatSchema);
