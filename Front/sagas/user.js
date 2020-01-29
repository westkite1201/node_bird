import { all, delay, fork, put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3065/api";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from "../reducers/user";

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post("/user/login", loginData);
}

function* login(action) {
  console.log("login !");
  try {
    // yield call(loginAPI);
    const result = yield call(loginAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  console.log("hello watchLogin");
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  console.log("[SEO] SIGNUPAPI ", signUpData);
  // 서버에 요청을 보내는 부분
  return axios.post("/user/", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);

    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
