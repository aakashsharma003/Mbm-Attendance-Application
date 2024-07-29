import axios from "axios";
import { server } from "../../main";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ActionAreaCard from "../Card/Card";
import "../Card/Card.css";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export const SubjectList = ({
  setUpdateForm,
  setSubjectId,
  clicked,
  setClicked,
  setInnerText,
  editOrdelete,
  setSideNav,
  sidenav,
  attendPage,
  setAttendPage,
  setViewAttendance,
  view,
}) => {
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const location = useLocation();
  const data = location.state.data;

  const teacherid = data.teacherid ? data.teacherid : "";
  const studentid = data.rollno;
  const branch = data.branch;
  const semester = data.semester;
  const year = data.year;

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(
        `${server}/allsubjects?teacherid=${teacherid}`
      );
      const fetchedSubjects = res.data.subjects;
      setSubjects(fetchedSubjects);

      if (studentid) {
        const attendanceArray = await Promise.all(
          fetchedSubjects.map(async (Obj) => {
            const res = await axios.get(`${server}/getattendance`, {
              headers: {
                studentid,
                semester,
                branch,
                subjectid: Obj.subjectid,
              },
            });
            let { student_id, total_present, total_absent, total_lectures } =
              res.data.length == 0
                ? {
                    student_id: 0,
                    total_present: 0,
                    total_absent: 0,
                    total_lectures: 0,
                  }
                : res.data[0];
            return {
              subjectName: Obj.subjectname,
              total_present,
              total_absent,
              total_lectures,
            };
          })
        );
        setAttendance(attendanceArray);
      }
    };
    fetchSubjects();
  }, [clicked]);

  return (
    <>
      {!studentid &&
        subjects.map((Obj) => {
          return (
            <ActionAreaCard
              Obj={Obj}
              key={Obj.subjectid}
              clicked={clicked}
              setClicked={setClicked}
              setUpdateForm={setUpdateForm}
              setSubjectId={setSubjectId}
              setInnerText={setInnerText}
              editOrdelete={editOrdelete}
              setSideNav={setSideNav}
              sidenav={sidenav}
              attendPage={attendPage}
              setAttendPage={setAttendPage}
              setlist={setViewAttendance}
              view={view}
            />
          );
        })}

      {attendance.length > 0 &&
        attendance.map((Obj, indx) => {
          return (
            <Card key={indx} sx={{ maxWidth: 345, margin: "1%" }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">{Obj.subjectName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Present: {Obj.total_present}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Absent: {Obj.total_absent}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Lectures: {Obj.total_lectures}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
    </>
  );
};
