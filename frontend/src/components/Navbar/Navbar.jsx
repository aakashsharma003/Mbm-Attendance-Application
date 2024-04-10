import Logo_icon from "../../assets/logo.png";
import Userphoto from "../../assets/user.png";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo">
            <img className="nav-logo-icon" src={Logo_icon} alt="small-logo" />
          </div>
          <div className="logo">
            <img
              src={Userphoto}
              alt="user-profile"
              className="nav-logo-icon user-profile"
            />
          </div>
        </div>
      </header>
    </>
  );
};
