import { Outlet, NavLink } from "react-router-dom";
import workImg from "../../assets/image/workImg.png";
import logo from "../../assets/image/logo_lg.png";

const Auth = () => {
  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
          <div className="side">
            <NavLink to="/">
              <img className="logoImg" src={logo} alt="" />
            </NavLink>
            <img className="d-m-n" src={workImg} alt="workImg" />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
