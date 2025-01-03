import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h4>meet our team</h4>
        </div>

        
        <div className="team">
          <div className="member-info">
              <p>Xiaoxue Wang</p>
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

            <div className="member-info">
              <p>Grayson Slater</p>
              <div className="team-link">
                <a href="https://github.com/graysonslater">
                  <FaGithub />
                </a>
                <a href="https://github.com/graysonslater">
                {/* dont have linkin now */}
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="member-info">
              <p>Tucker</p>
              <div className="team-link">
                <a href="https://github.com/tuckervbos">
                  <FaGithub />
                </a>
                <a href="https://github.com/tuckervbos">
                {/* dont have linkin now */}
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="member-info">
              <p>Bee Thao</p>
              <div className="team-link">
                <a href="https://github.com/Thao88Bee">
                  <FaGithub />
                </a>
                <a href="https://github.com/Thao88Bee">
                {/* dont have linkin now */}
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="member-info">
              <p>Rylan</p>
              <div className="team-link">
                <a href="https://github.com/rfjaggard">
                  <FaGithub />
                </a>
                <a href="https://github.com/rfjaggard">
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