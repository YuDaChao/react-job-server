const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  avatar: { type: String }
});

mongoose.model('User', UserSchema); // 集合名: users
