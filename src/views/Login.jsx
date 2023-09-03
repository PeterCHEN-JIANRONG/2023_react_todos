import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiUserSignIn } from "../services/users";

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (!isValidate()) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await apiUserSignIn(form);
      const {token, exp, nickname} = data
      // 儲存 token > cookie
      document.cookie = `todo_token=${token};expires=${new Date(exp*1000).toUTCString()}`
      setLoading(false);

      navigate('/')
    } catch (error) {
      setLoading(false);
    }
  };

  // 表單驗證
  const isValidate = () => {
    let flag = true;
    const tempError = {
      email: "",
      password: "",
    };

    if (!form.email) {
      tempError.email = "email 必填";
      flag = false;
    }

    if (!form.password) {
      tempError.password = "密碼必填";
      flag = false;
    }

    setError(tempError);
    return flag;
  };

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
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
          onChange={handleChange}
        />
        <span>{error.email}</span>
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
          onChange={handleChange}
        />
        <span>{error.password}</span>
        <input
          className="formControls_btnSubmit"
          type="button"
          value="登入"
          onClick={(e) => {
            signIn();
          }}
          disabled={loading}
        />
        <NavLink className="formControls_btnLink" to="/auth/sign_up">
          註冊帳號
        </NavLink>
      </form>
    </>
  );
};

export default Login;
