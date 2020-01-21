export const initialState = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "제로초"
      },
      content: "첫 번째 게시글",
      img:
        "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726"
    }
  ],
  addPostErrorReason: false, //포스트 업로드 실패사유
  isAddingPost: false // 포스트 업로드 중
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "ADD_POST_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "ADD_POST_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "ADD_POST_FAILURE";

export const LOAD_USER_POST_REQUEST = "LOAD_USER_POST_REQUEST";
export const LOAD_USER_POST_SUCCESS = "LOAD_USER_POST_SUCCESS";
export const LOAD_USER_POST_FAILURE = "LOAD_USER_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const ADD_DUMMY = "ADD_DUMMY";

export const addPost = {
  type: ADD_POST
};

export const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: "Hello",
    UserId: 1,
    User: {
      nickname: "제로초"
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
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
