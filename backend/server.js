import express, { response } from "express";
import { engine } from "express-handlebars";
import {
  connectToDatabase,
  createStudentTable,
  getAllStudent,
  insertData,
} from "./query.js";
import "dotenv/config";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { error } from "console";
import { errorHandler } from "./errorHandler.js";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;
const exphbs = engine;

app.use(cors());
// connectToDatabase()
//   .then(() => {
//     console.log("Connected to Database");
//   })
//   .catch((err) => {
//     console.error("Error while connecting to database:", err);
//   });

// createStudentTable()
//   .then(() => {
//     console.log("Table created successfully");
//     // Call insertData function after creating the table
//     return insertData();
//   })
//   .then(() => {
//     console.log("All data inserted successfully.");
//   })
//   .catch((err) => {
//     console.error("Error while creating student table or inserting data:", err);
//   });

// default option
app.use(fileUpload());
app.post("/", (req, res) => {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile = req.files.samplefile;
  console.log(dirname);
  uploadPath = __dirname + "/upload/" + sampleFile.name;
  console.log(uploadPath);
  console.log(sampleFile);

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("file uploaded successfully");
  });
});
app.post("/student", (req, res, next) => {
  const rollno = req.query.rollno;
  const password = req.query.password;
  getAllStudent(rollno)
    .then((response) => {
      // console.log(response[0]);
      if (response[0].length == 0) throw new Error("Student not found");
      const { id, name, rollno, password, semester, branch, year, photo } =
        response[0][0];
      res.json({
        id,
        rollno,
        name,
        password,
        semester,
        branch,
        year,
        photo,
        message: "login Successfully..!!",
      });
    })
    .catch((err) => {
      // console.error("error while getting student", err);
      next(err);
    });
});

// Templating engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.get("", (req, res) => {
  res.render("index");
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
