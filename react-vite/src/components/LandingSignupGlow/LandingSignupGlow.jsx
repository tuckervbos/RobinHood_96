import { Link } from "react-router-dom";
import "./LandingSignupGlow.css";

const LandingSignupGlow = () => {
  return (
    <div className="landingGlowSec">
      <div className="landingGlow">
        <h2 className="landingGlowH2">Join a New Generation</h2>
        <h2 className="landingGlowH2">of Investors Today!</h2>
        <Link className="landingGlowLink" to={"/signup"}>
          <button className="landingSignupBTN">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingSignupGlow;
