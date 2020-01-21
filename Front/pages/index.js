import React, { useEffect } from "react";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const Home = () => {
  const dispatch = useDispatch();
  /* useSelector 사용해서  state 에 접근  */
  // 더 잘게 쪼개도 댐
  const { user, isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);
  console.log(user);
  // useEffect(() => {
  //   dispatch(loginRequestAction);
  // }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div>로그인했습니다. : {user.nickname}</div>
      ) : (
        <div>로그아웃했습니다.</div>
      )}
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
