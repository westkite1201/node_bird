import { all, fork, takeLatest, takeEvery, delay } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../reducers/user";
import axios from "axios";
/*
  takeEvery는 항상 감시
  takeLatest는 이전 요청이 끝나지않은게 있다면 
  이전요청을 취소
*/

function signUpAPI() {
  return axios.post("/sign");
}

function* signUp() {
  try {
    yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}
function loginAPI() {
  return axios.post("/sign");
}
function* login() {
  try {
    yield delay(2000);
    yield call(loginAPI); //서버로 보낸 요청이 와야 (동기)
    yield put({
      //put dispatch랑 동일
      type: LOG_IN_SUCCESS
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
//call ,fork 차이는
// call = 동기호출
// fork = 비동기호출
// 이벤트 같은애들이라 주로 fork 사용함
export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
