import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h4>Meet Our team</h4>
        </div>

        
        <div className="team">
          <div className="member-info">
              <p>Xiaoxue"need a english name" Wang</p>
              <div className="team-link">
                <a href="https://github.com/Xiaoxue895">
                  <FaGithub />
                </a>
                <a href="https://github.com/Xiaoxue895">
                {/* dont have linkin now */}
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* other people */}
        </div>

        <div className="inspiration">
          <p>
            {/* need deepseek => cheep */}
            This is a full-stack project where we chose to clone Robinhood. In addition to the two complete CRUD operations, we also attempted to implement a search function and incorporated AI applications 
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;