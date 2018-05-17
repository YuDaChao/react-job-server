const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  avatar: { type: String },
  post: { type: String }, // 职位
  info: { type: String }, // 个人或职位描述
  company: { type: String }, // 公司名称
  salary: { type: String }
});

mongoose.model('User', UserSchema); // 集合名: users
