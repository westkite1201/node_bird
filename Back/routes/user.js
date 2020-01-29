const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
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

router.post("/login", (req, res) => {});
router.post("/logout", (req, res) => {});

router.get("/:id/follow", (req, res) => {});

router.post("/:id/follow", (req, res) => {});

router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
