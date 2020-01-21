import { useCallback } from "react";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import { useInput } from "../pages/signup";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction, LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          id,
          password
        }
      });
      console.log({
        id,
        password
      });
    },
    [id, password]
  );
  //자식 컴포넌트에 넘기는 함수는 무조건 useCallback으로 감싸준다
  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" required value={id} onChange={onChangeId}></Input>
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          required
          type="password"
          value={password}
          onChange={onChangePassword}
        ></Input>
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};
export default LoginForm;
