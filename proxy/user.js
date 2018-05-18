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
 * 根据用户名和密码查询用户， 不区分大小写
 * @param loginName 用户名
 * @param password 密码
 * @param filter 过滤条件
 * @param callback
 */
exports.getUserByLoginNameAndPwd = function (loginName, password, filter, callback) {
  User.findOne({userName: new RegExp('^' + loginName + '$', "i"), password}, filter, callback);
};

/**
 * 添加用户信息
 * @param userName 用户名
 * @param password 密码
 * @param role 角色
 * @param callback 回调函数
 */
exports.newAndSave = function (userName, password, role, callback) {
  const user = new User();
  user.userName = userName;
  user.password = md5(password);
  user.role     = role;
  user.post     = '';
  user.avatar   = '';
  user.salary   = '';
  user.info     = '';
  user.company  = '';
  user.save(callback)
};

/**
 * 根据用户id跟新用户信息
 * @param id
 * @param updateFields 需要跟新的字段
 * @param callback 回调函数
 */
exports.updateById = function (id, updateFields, callback) {
  User.findByIdAndUpdate(id, updateFields, callback)
};
