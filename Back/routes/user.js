const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const passport = require("passport");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("hello");
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (exUser) {
      console.log("exuser");
      return res.status(400).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt 는 10~13사이
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
  }
});

//api/user/3 -> req.params.id 로 3 가져 올수 있음
router.post(":/id", (req, res) => {});

router.post("/login", (req, res, next) => {
  console.log("login!!");
  passport.authenticate("local", (err, user, info) => {
    console.log("err, user, info ", err, user, info);
    if (err) {
      // 서버에러
      console.error(err);
      next(err);
    }
    //로직상 에러
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      console.log("login sucuess ", req.user);
      const filteredUser = Object.assign({}, user.toJSON());
      delete filteredUser.password;
      return res.json(filteredUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공 ");
});

router.get("/:id/follow", (req, res) => {});

router.post("/:id/follow", (req, res) => {});

router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
