const models = require('../models');
const md5 = require('blueimp-md5');
const User = models.User;

/**
 * 根据用户名查找用户，不区分大小写
 * @param loginName 登录名
 * @param callback 回调函数
 */
exports.getUserByLoginName = function (loginName, callback) {
  User.findOne({'userName': new RegExp('^' + loginName + '$', "i")}, callback);
};

/**
 * 添加用户信息
 * @param userName 用户名
 * @param password 密码
 * @param role 角色
 * @param avatar 头像
 * @param callback 回调函数
 */
exports.newAndSave = function (userName, password, role, avatar, callback) {
  const user = new User();
  user.userName = userName;
  user.password = md5(password);
  user.role     = role;
  user.avatar   = avatar;
  user.save(callback)
};
