import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard() {
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
          <Typography gutterBottom variant="h5" component="div">
            SubjectName
          </Typography>
          <Typography variant="body2" color="text.secondary">
            SubjectCode
          </Typography>
          <Typography variant="body2" color="text.secondary">
            total_attendence
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Marked_attendence
          </Typography>
          <Typography variant="body2" color="text.secondary">
            degree
          </Typography>
          <Typography variant="body2" color="text.secondary">
            allottedTeacher
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
