const dummyUser = {
  nickname: "제로초",
  Post: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
  signUpData: false
};
export const initialState = {
  isLoggedIn: false, //로그인 여부
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "",
  signedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signedUpErrorReason: "", // 회원가입 실패사유
  me: null, // 내정보 ,
  followingList: [], //팔로잉 리스트
  followerList: [],
  userInfo: null
};

//리덕스 사가는 비동기 요청 처리할떄 사용

//export const SIGN_UP = "SIGN_UP";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; // 액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; // 액션의 이름
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; // 액션의 이름

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST";
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS";
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

//동적 데이터는 함수
export const signUpAction = data => {
  return {
    type: SIGN_UP,
    data: data
  };
};
export const signUpSuccess = {
  type: SIGN_UP_SUCCESS
};

export const logoutRequestAction = {
  type: LOG_OUT_REQUEST
};
export const loginRequestAction = (data = {
  type: LOG_IN_REQUEST,
  data: data
});

//바로 리턴 가능
export const signUp = data => ({
  type: SIGN_UP_REQUEST,
  data
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* login cycle */
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: true
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        iisLoggingIn: false,
        isLoading: false,
        me: dummyUser
      };
    }

    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        me: null,
        isLoading: false,
        logInErrorReason: action.error
      };
    }

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpData: action.data
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
export default reducer;
