import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiUserSignUp  } from "../services/users";

const SignUp = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    password_confirm: "",
  });

  // 註冊
  const signUp = async () => {

    if(!isValidate()){
      return
    }

    try{
      const { data } = await apiUserSignUp(form)
      navigate('/auth/login')
    } catch(error) {
      // error
    }
  };

  // 表單驗證
  const isValidate = () => {

    if(!form.email) {
      console.log('請輸入 Email')
      return false
    }

    if(!form.nickname) {
      console.log('請輸入暱稱')
      return false
    }

    if(!form.password) {
      console.log('請輸入密碼')
      return false
    }

    if(form.password !== form.password_confirm) {
      console.log('輸入密碼不相同')
      return false
    }

    return true
  }

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  return (
    <>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">註冊帳號</h2>
        <label className="formControls_label" htmlFor="email">
          Email
        </label>
        <input
          className="formControls_input"
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          required
          defaultValue={form.email}
          onChange={handleChange}
        />
        <label className="formControls_label" htmlFor="nickname">
          您的暱稱
        </label>
        <input
          className="formControls_input"
          type="text"
          name="nickname"
          id="nickname"
          placeholder="請輸入您的暱稱"
          defaultValue={form.nickname}
          onChange={handleChange}
        />
        <label className="formControls_label" htmlFor="password">
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="password"
          id="password"
          placeholder="請輸入密碼"
          required
          defaultValue={form.password}
          onChange={handleChange}
        />
        <label className="formControls_label" htmlFor="password_confirm">
          再次輸入密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          name="password_confirm"
          id="password_confirm"
          placeholder="請再次輸入密碼"
          required
          defaultValue={form.password_confirm}
          onChange={handleChange}
        />
        <input
          className="formControls_btnSubmit"
          type="button"
          onClick={(e) => {
            signUp();
          }}
          value="註冊帳號"
        />
        <NavLink className="formControls_btnLink" to="/auth/login">
          登入
        </NavLink>
      </form>
    </>
  );
};

export default SignUp;
