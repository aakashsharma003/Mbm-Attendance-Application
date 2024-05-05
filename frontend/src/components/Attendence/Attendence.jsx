import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { images } from "../../Constants";
import { TextField } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Pagination, Navigation } from "swiper/modules";
import "./Attendence.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import DefaultProfile from "/DefaultProfile.jpg";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Attendence = ({
  setSubjects,
  setAttendPage,
  setSideNav,
  sidenav,
  subjectid,
}) => {
  const [attendencedata, setAttendenceData] = useState([]);
  // const [sid, setsid] = useState("");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${server}/getstudents${subjectid}`);
        const subjectname = res.data.subjectname;
        const studentsData = res.data.students;
        const newData = studentsData.map((student) => ({
          studentid: student.rollno,
          subjectid: subjectid,
          studentname: student.name,
          photo: student.photo,
          ispresent: null, // Assuming ispresent should be initialized as false
          subjectname: subjectname,
        }));
        setAttendenceData(newData);
        toast.success(res.data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Failed to fetch students");
      }
    };
    if (!localStorage.getItem(`subjectId_${subjectid}`)) {
      fetchStudents();
    } else {
      try {
        // toast.success("ha aya hu yha pr");
        // const storedSubjectId = JSON.parse(
        // localStorage.getItem("subjectId_${subjectid}")
        // );
        // setsid(storedSubjectId);
        const storedData = JSON.parse(
          localStorage.getItem(`subjectId_${subjectid}`)
        );
        setAttendenceData(storedData);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, [subjectid]);
  useEffect(() => {
    const saveLocally = () => {
      try {
        localStorage.setItem(
          "attendence-data-subjectId",
          JSON.stringify(subjectid)
        );
        localStorage.setItem(
          `subjectId_${subjectid}`,
          JSON.stringify(attendencedata)
        );
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    };
    if (attendencedata.length > 0) saveLocally();
  }, [attendencedata]);
  const submitHandle = async (data) => {
    try {
      const res = await axios.post(`${server}/commitAttendance`, {
        data,
      });
      localStorage.removeItem(`subjectId_${subjectid}`);
      setSideNav(true);
      setAttendPage(true);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };
  const handleAttendance = (index, isPresent) => {
    const updatedData = [...attendencedata];
    updatedData[index].ispresent = isPresent;
    setAttendenceData(updatedData);
  };

  const [mySwiper, setMySwiper] = useState({});
  return (
    <div className="t-attendence-container">
      <div className="t-attendence">
        <div className="fa-box">
          <ArrowBackIcon
            sx={{
              width: "40px",
              height: "100%",
              bgcolor: "white",
              border: "2px solid gray",
              marginRight: "1%",
              borderRadius: "4px",
            }}
            onClick={() => {
              setSideNav(true);
              setAttendPage(true);
            }}
          />
          <FullscreenIcon
            sx={{
              width: "50px",
              height: "100%",
              bgcolor: "white",
              border: "2px solid gray",
              marginRight: "1%",
              borderRadius: "4px",
            }}
            onClick={() => {
              sidenav ? setSideNav(false) : setSideNav(true);
            }}
          />

          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
        </div>

        <Swiper
          onInit={(e) => {
            setMySwiper(e);
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {attendencedata.length === 0 ? (
            <NoDataFound />
          ) : (
            attendencedata.map((student, index) => {
              {
                return (
                  <SwiperSlide style={{ height: "100%" }}>
                    <AttendProfile
                      key={student.studentid}
                      name={student.studentname}
                      subject={student.subjectname}
                      rollno={student.studentid}
                      image={
                        student.photo ? server + student.photo : DefaultProfile
                      }
                      mySwiper={mySwiper}
                      ispresent={student.ispresent}
                      handleAttendance={(isPresent) =>
                        handleAttendance(index, isPresent)
                      }
                    />
                  </SwiperSlide>
                );
              }
            })
          )}
        </Swiper>
        <Button
          variant="contained"
          sx={{ width: "78%", margin: "2%" }}
          onClick={() => {
            submitHandle(attendencedata);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
const AttendProfile = ({
  name,
  subject,
  rollno,
  image,
  mySwiper,
  ispresent,
  handleAttendance,
}) => {
  const [bgcolor, setbgcolor] = useState("white");
  useEffect(() => {
    ispresent == null
      ? setbgcolor("white")
      : ispresent == true
      ? setbgcolor("rgb(142, 233, 142)")
      : setbgcolor("rgb(250, 80, 80)");
  }, []);
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
            handleAttendance(true);
            mySwiper.slideNext();
          }}
        >
          Mark Present
        </button>
        <button
          className="attend-btn-a"
          onClick={() => {
            setbgcolor("rgb(250, 80, 80)");
            handleAttendance(false);
            mySwiper.slideNext();
          }}
        >
          Mark Absent
        </button>
      </div>
    </div>
  );
};
const NoDataFound = () => {
  return (
    <div
      style={{
        background: "white",
        fontSize: "3vh",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50dvh",
      }}
    >
      No Student Found ? Pls Contact Support team..!!!
    </div>
  );
};

export default Attendence;
