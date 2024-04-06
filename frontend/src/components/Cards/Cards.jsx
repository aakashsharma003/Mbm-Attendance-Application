import attend from "/check.png";
import notattended from "/multiply.png";
import "./Card.css";
const Cards = () => {
  return (
    <div className="card">
      <div className="card-heading">subjectName</div>
      <div className="card-box">
        <div className="card-image">
          <img src={attend} alt="attend-icon" />
        </div>
        <div className="card-subheading">attended</div>
      </div>
      <div className="card-box-n">
        <div className="card-image">
          <img src={notattended} alt="attend-icon" />
        </div>
        <div className="card-subheading" style={{ color: "#e21b1b" }}>
          not attended
        </div>
      </div>
    </div>
  );
};

export default Cards;
