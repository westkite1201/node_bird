const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv"); //.env를 사용하기위한 모듈
const passport = require("passport");

const db = require("./models");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passportConfig = require("./passport");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const app = express();

db.sequelize.sync();
passportConfig();

dotenv.config();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: true, // 매번  새션 강제 저장
    saveUninitialized: false, //빈값도 저장
    secret: process.env.COOKIE_SECRET, //암호화
    cookie: {
      //보안
      httpOnly: true, //http
      secure: false //https 를 쓸때
    }
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form 처리

//passport 사용
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);

app.listen(3065, () => {
  console.log("server is running on localhost:8080");
});
