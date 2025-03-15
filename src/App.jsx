import { Route, Routes, NavLink } from "react-router-dom";
import Todo from "./views/Todo";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Auth from "./views/layout/Auth";
import ProtectedRoute from "./views/layout/ProtectedRoute";

const App = () => {
  const getNavStyle = ({ isActive }) => {
    return {
      color: isActive && "red",
    };
  };

  return (
    <>
      <nav>
        <NavLink
          to="/"
          style={getNavStyle}
          className={({ isActive }) =>
            ["apple banana", isActive ? "router-link-active" : null].join(" ")
          }
        >
          首頁
        </NavLink>{" "}
        |
        <NavLink
          to="/auth/login"
          style={getNavStyle}
          className={({ isActive }) =>
            ["apple banana", isActive ? "router-link-active" : null].join(" ")
          }
        >
          登入
        </NavLink>{" "}
        |
        <NavLink
          to="/auth/sign_up"
          style={getNavStyle}
          className={({ isActive }) =>
            ["apple banana", isActive ? "router-link-active" : null].join(" ")
          }
        >
          註冊
        </NavLink>
      </nav>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
