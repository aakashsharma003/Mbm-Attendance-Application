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
      <div className="footer-box">
        <div className="footer-heading">Design & Developed By</div>
        <div className="designAndDev">
          <div className="card">
            <div className="footer-profile">
              <Avatar sx={{ bgcolor: "orangered" }}>A</Avatar>
              <div style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>
                Akash Sharma
              </div>
            </div>

            <div className="desc">
              <div>3rd Year</div>
              <div>Computer Science</div>
            </div>
          </div>
          <div className="card">
            <div className="footer-profile">
              <Avatar sx={{ bgcolor: "violet" }}>V</Avatar>
              <div style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>
                Vishal Khatri
              </div>
            </div>

            <div className="desc">
              <div>3rd Year</div>
              <div>Computer Science</div>
            </div>
          </div>
        </div>
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
