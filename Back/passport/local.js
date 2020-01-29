//전략

const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password"
      },
      async (userId, password, done) => {
        try {
          console.log("userId, password, done ", userId, password, done);
          const user = await db.User.findOne({ where: { userId } });
          if (!user) {
            //passpost done 첫번째 인자 , 서버 쪽 에러 ,
            // 두번째인수 성공햇을때
            // 세번재 인수 로직상에서 에러
            return done(null, false, { reason: "존재하지 않는 사용자입니다!" });
          }
          const result = await bcrypt.compare(password, user.password);

          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
