import React, { useState, useCallback, Fragment, memo, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { SIGN_UP_REQUEST } from "../reducers/user";
//참고용 지나친 최적화
const TextInput = memo(({ value, onChange }) => {
  return (
    <Input name="user-id" value={value} required onChange={onChange}></Input>
  );
});

/*custom hook */
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const SignUp = () => {
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user);
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (me) {
      alert("로그인후 메인페이지로 이동합니다. ");
      Router.push("/");
    }
  }, [me && me.id]);

  /* use Callback 같은경우는  [] 안에 이 값이 변경되면 
  다시 재 렌더링 해준다 라는것을 명시해주는것
  useCallBack 같은경우 안에서 쓰는 state들은 [] 명시 
  */
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }

      dispatch({
        type: "SIGN_UP_REQUEST",
        data: {
          userId: id,
          password: password,
          nickname: nick
        }
      });
    },
    [id, nick, password, passwordCheck, term]
  );

  const onChangeNick = e => {
    setNick(e.target.value);
  };

  const onChangeTerm = e => {
    console.log("[SEO][onChangeTerm] ", e.target.checked);
    setTerm(e.target.checked);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = useCallback(
    e => {
      /*password 체크 계속 처리 */
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  /*
    const [id, setId] = useState("");
    const onChangeId = e => {
        setId(e.target.value);
    };
  */
  const [id, onChangeId] = useInput("");
  return (
    <Fragment>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <TextInput value={id} onChange={onChangeId}></TextInput>
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <TextInput
            name="user-nick"
            value={nick}
            onChange={onChangeNick}
          ></TextInput>
        </div>
        <div>
          <label htmlFor="user-pass">비밀번호</label>
          <br />
          <Input
            name="user-pass"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          ></Input>
        </div>
        <div>
          <label htmlFor="user-pass">비밀번호</label>
          <br />
          <Input
            name="user-pass-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          ></Input>
          {passwordError && (
            <div style={{ color: "red" }}>패스워드가 불일치합니다.</div>
          )}
        </div>

        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            동의합니다.
          </Checkbox>
          {termError && (
            <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            {" "}
            가입하기{" "}
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SignUp;
