import axios from "axios";
import { server } from "../../main";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ActionAreaCard from "../Card/Card";
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
}) => {
  const [subjects, setSubjects] = useState([]);
  const location = useLocation();

  const teacherid = location.state.data.teacherId;
  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(
        `${server}/allsubjects?teacherid=${teacherid}`
      );
      const data = await res.data;
      setSubjects(data.subjects);
    };
    fetchSubjects();
  }, [clicked]);
  return (
    <>
      {subjects.map((Obj) => {
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
          />
        );
      })}
    </>
  );
};
