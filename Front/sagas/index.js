import user from "./user";
import post from "./post";
export default function* rootSagas() {
  yield all([call(user), call(post)]);
}
