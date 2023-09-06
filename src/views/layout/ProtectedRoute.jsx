import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiUserCheckout, userRequest } from "../../services/users";
import { todoRequest } from "../../services/todos";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(()=> {
    checkAuth();
  }, [])

  // 驗證 token
  const checkAuth = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todo_token="))
      ?.split("=")[1];

    if (!token) return navigate("/auth/login");

    // set axios defaults authorization
    // axios.defaults.headers.common['Authorization'] = token;

    // set custom instance authorization
    userRequest.defaults.headers.common["Authorization"] = token;
    todoRequest.defaults.headers.common["Authorization"] = token;

    try {
      const { data } = await apiUserCheckout();
      // console.log(data);
      setIsAuth(true)
    } catch (error) {
      // error
      navigate("/auth/login");
    }
  };

  return (<>{isAuth ? <Outlet /> : ""}</>);
};

export default ProtectedRoute;
