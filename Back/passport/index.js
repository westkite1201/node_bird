const passport = require("passport");
const db = require("../models");
const local = require("./local");
module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("passport serializeUser ! id ", id, " done ", done);
    //서버쪽에 [{id:3 , cookie:'asdfgh'}] 이렇게 저장한다함 서버쪽 메모리 부담을 최소화하기위해
    //나중에 쿠키 비교해서 id 로 조회알려줌
    //쿠키는 프론트에 보냄
    return done(null, user.id); // 리턴안해도됌
  });

  //프론트가 요청 보낼때마다 실행됌 ()
  passport.deserializeUser(async (id, done) => {
    console.log("passport deserializeUser ! id ", id, " done ", done);
    try {
      const user = await db.User.findOne({ where: { id } });

      return done(null, user); //req.user
    } catch (e) {
      console.error(e);
      return done;
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보내여(asdfgh)
// 서버가 쿠키피사 , 익스프레스 세션, 쿠기 검사 후 id :3 발견
// id : 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감
