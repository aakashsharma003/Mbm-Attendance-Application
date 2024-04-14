import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCards } from "swiper/modules";
import { images } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Navigation } from "swiper/modules";
import "./Attendence.css";
import { useState } from "react";

const Attendence = () => {
  return (
    <div className="t-attendence-container">
      <div className="t-attendence">
        <div className="fa-box">
          <button
            style={{
              border: "2px solid gray",
              borderRadius: "10%",
              width: "5%",
              marginRight: "1%",
              height: "100%",
              textAlign: "center",
              background: "white",
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "60%", height: "60%" }}
            />
          </button>
          <input
            style={{
              border: "2px solid gray",
              background: "white",
              flexGrow: "1",
              borderRadius: "12px",
            }}
            placeholder="Type to Search..."
          ></input>
        </div>

        <Swiper navigation={true} modules={[Pagination, Navigation]}>
          <SwiperSlide style={{ height: "100%" }}>
            <AttendProfile
              name={"Sachin"}
              rollno={"22UCSE4036"}
              subject={"DSA"}
              image={images.img1}
            />
          </SwiperSlide>
          <SwiperSlide style={{ height: "100%", background: "white" }}>
            <AttendProfile
              name={"Priya"}
              rollno={"22UCSE4031"}
              subject={"DSA"}
              image={images.img2}
            />
          </SwiperSlide>
          <SwiperSlide style={{ height: "100%", background: "white" }}>
            <AttendProfile
              name={"Kumkum"}
              rollno={"22UCSE4029"}
              subject={"DSA"}
              image={images.img3}
            />
          </SwiperSlide>
          <SwiperSlide style={{ height: "100%", background: "white" }}>
            <AttendProfile
              name={"Priya"}
              rollno={"22UCSE4031"}
              subject={"DSA"}
              image={images.img2}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
const AttendProfile = ({ name, subject, rollno, image }) => {
  const [bgcolor, setbgcolor] = useState("white");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: bgcolor,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        src={image}
        alt=""
        className="p-15"
        style={{ width: "50%", height: "60%", borderRadius: "50%" }}
      />
      <div className="info-box">
        <div className="info-box-lines">
          <div className="a-heading">Name:</div>
          <div className="a-subheading">{name}</div>
        </div>
        <div className="info-box-lines">
          <div className="a-heading">Rollno:</div>
          <div className="a-subheading">{rollno}</div>
        </div>
        <div className="info-box-lines">
          <div className="a-heading">Subject:</div>
          <div className="a-subheading">{subject}</div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <button
          className="attend-btn-p"
          onClick={() => {
            bgcolor == "white" || bgcolor == "rgb(245, 85, 85)"
              ? setbgcolor("rgb(142, 233, 142)")
              : setbgcolor("white");
          }}
        >
          Mark Present
        </button>
        <button
          className="attend-btn-a"
          onClick={() => {
            bgcolor == "white" || bgcolor == "rgb(142, 233, 142)"
              ? setbgcolor("rgb(245, 85, 85)")
              : setbgcolor("white");
          }}
        >
          Mark Absent
        </button>
      </div>
    </div>
  );
};

export default Attendence;
