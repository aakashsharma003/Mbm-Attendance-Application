import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { images } from "../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Navigation } from "swiper/modules";
import "./Attendence.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import DefaultProfile from "/DefaultProfile.jpg";

const Attendence = ({ setSideNav, sidenav, subjectid }) => {
  const [students, setStudents] = useState([]);
  const [attendencedata, setAttendenceData] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${server}/getstudents${subjectid}`);
        const subjectname = res.data.subjectname;
        setStudents(res.data.students);
        const newData = [];
        for (let index = 0; index < attendencedata.length; index++) {
          const { id, name, rollno, password, semester, branch, year, photo } =
            attendencedata[index];
          newData.push({
            id,
            name,
            rollno,
            password,
            semester,
            branch,
            year,
            photo,
            subjectname,
          });
        }
        setAttendenceData(newData);
        toast.success(res.data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.response.message);
      }
    };
    fetchStudents();
  }, []);

  const [mySwiper, setMySwiper] = useState({});
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
            onClick={() => {
              sidenav ? setSideNav(false) : setSideNav(true);
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

        <Swiper
          onInit={(e) => {
            setMySwiper(e);
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {students.map((student) => {
            {
              return (
                <SwiperSlide style={{ height: "100%" }}>
                  <AttendProfile
                    key={student.id}
                    name={student.name}
                    rollno={student.rollno}
                    subject={student.subjectname}
                    image={
                      student.photo ? server + student.photo : DefaultProfile
                    }
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
};
const AttendProfile = ({ name, subject, rollno, image, mySwiper }) => {
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
        alt="image"
        className="p-15"
        style={{ width: "50%", height: "50%", borderRadius: "50%" }}
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
            setbgcolor("rgb(142, 233, 142)");
            mySwiper.slideNext();
          }}
        >
          Mark Present
        </button>
        <button
          className="attend-btn-a"
          onClick={() => {
            setbgcolor("rgb(250, 80, 80)");

            mySwiper.slideNext();
          }}
        >
          Mark Absent
        </button>
      </div>
    </div>
  );
};

export default Attendence;

// Import necessary modules and dependencies

// const Attendence = ({ setSideNav, sidenav, subjectid }) => {
//   const [students, setStudents] = useState([]);
//   const [attendencedata, setAttendenceData] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get(`${server}/getstudents${subjectid}`);
//         const subjectname = res.data.subjectname;
//         const newAttendenceData = res.data.students.map(student => ({
//           ...student,
//           subjectname,
//           ispresent: false,
//         }));
//         setStudents(res.data.students);
//         setAttendenceData(newAttendenceData);
//         toast.success(res.data.message);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.response.message || 'Failed to fetch students');
//       }
//     };

//     fetchStudents();
//   }, [subjectid]);

//   const handleAttendance = (index, isPresent) => {
//     const updatedData = [...attendencedata];
//     updatedData[index].ispresent = isPresent;
//     setAttendenceData(updatedData);
//   };

//   const [mySwiper, setMySwiper] = useState({});

//   return (
//     // Your JSX content
//   );
// };

// const AttendProfile = ({
//   name,
//   subject,
//   rollno,
//   image,
//   mySwiper,
//   handleAttendance,
// }) => {
//   const [bgcolor, setbgcolor] = useState("white");

//   return (
//     // Your JSX content
//   );
// };

// export default Attendence;
