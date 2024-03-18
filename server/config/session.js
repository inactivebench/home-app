const session = require("express-session");

//session

session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
});
module.exports = session;
