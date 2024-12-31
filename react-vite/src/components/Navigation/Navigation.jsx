import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
    const user = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    const login = (e) => {
      e.preventDefault();
      navigate("/login")
    }

    const signup = (e) => {
      e.preventDefault();
      navigate("/signup")
    }

  return (

    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        { user ? (<>
        <ProfileButton />
        </>) : (<>
        <button onClick={login}>Login</button>
        <button onClick={signup}>SignUp</button>
        </>) }
      </li>
    </ul>
  );
}

export default Navigation;
