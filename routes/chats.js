const express = require('express');
const router = express.Router();

const Chat = require('../proxy').Chat;
const User = require('../proxy').User;

// 过滤不需要的字段
const filter = {password: 0, "__v": 0};

router.get('/list', function (req, res) {
  const userId = req.cookies.user_id;
  User.getAllUsers(function (err, users) {
    if (!err) {
      const userList = {};
      users.forEach(user => {
        userList[user._id] = {userName: user.userName, avatar: user.avatar}
      });

      Chat.getChatsByUserId(userId, filter, function (err, chats) {
        if (!err) {
          res.send({
            code: 0,
            data: {
              users: userList,
              chats
            }
          })
        }
      })
    }
  })
});

router.post('/edit-msg', function (req, res) {
  const { from } = req.body;
  const to = req.cookies.user_id;
  Chat.updateChatStatusByUserId(from, to, {read: true}, function (err, doc) {
    if (!err) {
      res.send({
        code: 0,
        data: doc.nModified
      });
    } else {
      res.send({
        code: 1,
        msg: '更新失败！'
      });
    }
  })
});

module.exports = router;

