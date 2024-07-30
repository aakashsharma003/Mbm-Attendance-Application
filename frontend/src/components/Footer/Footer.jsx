import { Avatar } from "@mui/material";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-image">
        <img
          src="https://api.mbm.ac.in/assets/f4e787ce-f030-4b25-9d46-1c7473abbc7b"
          alt="MBM LOGO"
        />
      </div>
      <div className="row">
        <div className="col-md-12 copy">
          <p className="copyright">© Copyright 2024 MBM University, Jodhpur</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
