"use strict";

var _require = require('./model'),
    User = _require.User;

var _require2 = require('./model'),
    Text = _require2.Text;

var express = require('express');

var jwt = require('jsonwebtoken');

var path = require("path");

var app = express();
app.use(express.json());
app.use(express["static"]("public"));
var port = process.env.PORT || 3001;
var SECRET = "fdfhfjdfdjfdjerwrereresaassa2dd@ddds"; // app.get('/', async(req, res) => {
//   res.send('ok')
// })
// app.get('/', (req, res) => res.send('Hello World!'))
// 从MongoDB数据库express-auth中的User表查询所有的用户信息

app.get('/users', function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;
          res.send(users);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/login.html"));
});
app.get("/pic", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/pic.html"));
});
app.get("/signin", function (req, res) {
  res.sendFile(path.join(__dirname, "/html/signin.html"));
});
app.post('/register', function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.create({
            username: username,
            password: password
          }));

        case 2:
          user = _context2.sent;
          res.send('register');
          res.redirect('/pic');

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/pic', function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.create({
            username: req.body.username,
            password: req.body.password
          }));

        case 2:
          user = _context3.sent;
          return _context3.abrupt("return", res.redirect('/'));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/login', function _callee4(req, res) {
  var user, isPasswordValid, token;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.body.username
          }));

        case 2:
          user = _context4.sent;

          if (user) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.redirect('/'));

        case 5:
          // 2.用户如果存在，则看密码是否正确
          isPasswordValid = require('bcryptjs').compareSync(req.body.password, user.password);

          if (isPasswordValid) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.redirect('/'));

        case 8:
          return _context4.abrupt("return", res.redirect('/pic'));

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 中间件：验证授权

var auth = function auth(req, res, next) {
  var rawToken, tokenData, id;
  return regeneratorRuntime.async(function auth$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // 获取客户端请求头的token
          rawToken = String(req.headers.authorization).split(' ').pop();
          tokenData = jwt.verify(rawToken, SECRET); //  console.log(tokenData)
          // 获取用户id

          id = tokenData.id; //  const user = await User.findById(id)

          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findById(id));

        case 5:
          req.user = _context5.sent;
          next();

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

app.get('/profile', auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.listen(3001, function () {
  console.log('http://localhost:3001');
});