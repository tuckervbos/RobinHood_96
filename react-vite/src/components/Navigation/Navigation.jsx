import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import logo from "/favicon.ico";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const signup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="navBar">
      <div className="navSec">
        <NavLink className="navBarLink" to="/">Group <img src={logo} alt="" />
        <img src="" alt="" />
         Investors</NavLink>
        {user ? (
          <>
            <ProfileButton />
          </>
        ) : (
          <>
          <div className="navBarLoginSignupBtn">
          <button className="navBarLoginBtn" onClick={login}>Login</button>
          <button className="navBarSignupBtn" onClick={signup}>SignUp</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
