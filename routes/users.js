const express = require('express');
const md5 = require('blueimp-md5');
const router = express.Router();

const User = require('../proxy').User;

// 过滤不需要的字段
const filter = {password: 0, "__v": 0};

/**
 * 处理用户登录逻辑
 */
router.post('/login', function (req, res) {
  const { userName, password } = req.body;
  if (!userName) {
    res.send({
      code: 1, msg: '用户名不能为空!'
    });
    return
  }
  if (!password) {
    res.send({
      code: 1, msg: '密码不能为空!'
    });
    return
  }
  User.getUserByLoginNameAndPwd(userName, md5(password), filter, function (err, user) {
    if (!err) {
      if (!user) {
        res.send({
          code: 1,
          msg: '用户名或密码错误!'
        })
      } else {
        // 保持cookie信息
        res.cookie('user_id', user._id.toString(), {maxAge: 1000 * 3600 * 24});
        res.send({
          code: 0,
          data: user,
          isLogined: true
        })
      }
    } else {
      res.send({
        code: 1,
        msg: '登录失败!'
      })
    }
  })
});

/**
 * 处理用户注册逻辑
 */
router.post('/register', function(req, res, next) {
  const { userName, password, rePassword, roleValue } = req.body;
  if (!userName) {
    res.send({
      code: 1, msg: '用户名不能为空!'
    });
    return
  }
  if (!password) {
    res.send({
      code: 1, msg: '密码不能为空!'
    });
    return
  }
  if (!rePassword) {
    res.send({
      code: 1, msg: '确认密码不能为空!'
    });
    return
  }
  if (password !== rePassword) {
    res.send({
      code: 1, msg: '两次密码不一致!'
    });
    return
  }
  // 查询用户是否存在
  User.getUserByLoginName(userName, function (err, user) {
    if (user) { // 用户已存在
      res.send({
        code: 1, msg: '用户已存在!'
      })
    } else {
      User.newAndSave(userName, password, roleValue , function (err, user) {
        if (!err) {
          // 响应数据不携带密码
          // delete user.password;
          const resUser = {userName, role: Number(roleValue), id: user._id};
          res.send({
            code: 0,
            data: resUser
          })
        } else {
          res.send({
            code: 1, msg: '注册失败!'
          })
        }
      });
    }
  });
});

/**
 * 处理更新用户信息逻辑
 */
router.post('/update', function (req, res) {
  const user = req.body;
  const userId = req.cookies.user_id;
  if (!userId) {
    res.send({
      code: 1, msg: '请先登录!'
    })
  } else {
    User.updateById(userId, user, function (err, oldUser) {
      if (!err) {
        if (!oldUser) {
          res.clearCookie('user_id');
          res.send({
            code: 1, msg: '请重新登录!'
          })
        } else {
          const { userName, role, _id } = oldUser;
          res.send({
            code: 0, data: Object.assign({}, user, {userName, role, _id})
          })
        }
      } else {
        res.send({
          code: 1, msg: '更新失败!'
        })
      }
    })
  }
});

/**
 * 获取cookie
 */
router.get('/accessToken', function (req, res) {
  const userId = req.cookies.user_id;
  res.send(userId)
});

/**
 * 获取当前user信息
 */
router.get('/user', function (req, res) {
  const { userId } = req.query;
  User.getUserById(userId, filter, function (err, user) {
    if (!err) {
      if (user) {
        res.send({
          code: 0,
          data: user
        })
      } else {
        res.send({
          code: 1,
          msg: "cookie可能被篡改!"
        })
      }
    } else {
      console.log(err);
      res.send({
        code: 1,
        msg: "获取信息错误!"
      })
    }
  })
});

router.get('/user-list', function (req, res) {
  const { role } = req.query;
  if (!role) {
    res.send({
      code: 1,
      msg: '查询失败!'
    });
    return
  }
  User.getUsersByRole({role}, filter, function (error, users) {
    if (!error) {
      res.send({
        code: 0,
        data: users
      })
    } else {
      res.send({
        code: 1,
        msg: '查询失败!'
      });
    }
  })
});



module.exports = router;
