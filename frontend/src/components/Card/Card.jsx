import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";

export default function ActionAreaCard({
  Obj,
  clicked,
  setClicked,
  setUpdateForm,
  setSubjectId,
  setInnerText,
}) {
  const {
    subjectid,
    subjectname,
    subjectcode,
    semester,
    branch,
    degree,
    allotedTeacher,
    year,
  } = Obj;
  const deleteSubject = async (id) => {
    try {
      const res = await axios.delete(`${server}/deleteSubject${id}`);
      const data = await res.data;
      toast.success(data.message);
      setClicked(!clicked);
    } catch (err) {
      toast.error(err);
    }
  };
  const editSubject = (subjectid) => {
    setSubjectId(subjectid);
    setInnerText("Back");
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1%" }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          {subjectname && (
            <Typography gutterBottom variant="h5" component="div">
              {subjectname}
            </Typography>
          )}
          {subjectcode && (
            <Typography variant="body2" color="text.secondary">
              {subjectcode}
            </Typography>
          )}
          {semester && (
            <Typography variant="body2" color="text.secondary">
              {semester}
            </Typography>
          )}
          {branch && (
            <Typography variant="body2" color="text.secondary">
              {branch}
            </Typography>
          )}
          {degree && (
            <Typography variant="body2" color="text.secondary">
              {degree}
            </Typography>
          )}
          {allotedTeacher && (
            <Typography variant="body2" color="text.secondary">
              {allotedTeacher}
            </Typography>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <FontAwesomeIcon
              onClick={() => {
                setUpdateForm(true);
                editSubject(subjectid);
              }}
              icon={faPenToSquare}
              style={{
                marginRight: "3px",
                height: "13%",
                width: "13%",
                color: "green",
              }}
            />
            <FontAwesomeIcon
              onClick={() => {
                if (
                  confirm("Are sure you want delete this Subject ?") == true
                ) {
                  deleteSubject(subjectid);
                } else {
                  toast.error("delete Operation Cancelled..!!");
                }
              }}
              icon={faTrash}
              style={{ height: "10%", width: "10%", color: "red" }}
            />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
