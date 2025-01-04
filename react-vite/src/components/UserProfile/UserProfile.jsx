import { useSelector } from "react-redux";
import "./UserProfile.css";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div id="userProfile">
      <h1>{user.username} Profile</h1>
      <div className="profileSec">
        <div className="profileSec1">
          <div>
            <img
              title={`${user.username} profile picture`}
              src="https://i.pinimg.com/736x/a8/4a/a3/a84aa310f33862e53c30f55bdf94b013.jpg"
              alt={`${user.username} profile picture`}
            />
          </div>
          <div className="userSec">
            <div>
              <h2>
                {user.firstname}, {user.lastname}
              </h2>
            </div>
            <div className="userBtn">
              <button className="profileEditBtn">Edit Profile</button>
              <button className="profileDeleteBtn">Delete Profile</button>
            </div>
          </div>
        </div>
        <div className="profileSec2">
          <div>
            <h2>Total Stocks</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
