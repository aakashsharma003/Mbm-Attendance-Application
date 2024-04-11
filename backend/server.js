import express, { response, urlencoded } from "express";
import { engine } from "express-handlebars";
import {
  connectToDatabase,
  createStudentTable,
  createSubjectTable,
  createTeacherTable,
  getAllStudent,
  getAllTeacher,
  getStudentImage,
  insertData,
  insertIntoSubject,
  insertIntoTeacher,
  insertTeacherData,
  uploadStudentImage,
  uploadTeacherImage,
} from "./query.js";
import "dotenv/config";
import { error } from "console";
import { errorHandler } from "./errorHandler.js";
import cors from "cors";
import multer from "multer";
const app = express();
const port = process.env.PORT || 5000;
// const exphbs = engine;

app.use(cors({ origin: "*" }));
app.use(express.json());

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

// createTeacherTable()
//   .then(() => {
//     console.log("Table created successfully");
//     // Call insertData function after creating the table
//     return insertTeacherData()
//       .then(() => {
//         console.log("All data inserted successfully.");
//       })
//       .catch((err) => {
//         console.error("Error while inserting data in teacher table ", err);
//       });
//   })
//   .catch((err) => {
//     console.error("Error while creating teacher table ", err);
//   });

// createSubjectTable()
//   .then((res) => {
//     console.log("subject table created successfully.!");
//   })
//   .catch((err) => {
//     console.error("Error while creating subject table", err);
//   });

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.post("/uploadImage", upload.single("profileImage"), (req, res, next) => {
  // console.log(req.file.path);
  // console.log(req.file);
  let rollno = req.body.rollno;
  let tid = req.body.tid;
  console.log(rollno, tid);
  const imagePath = "/uploads/" + req.file.filename;
  if (rollno)
    uploadStudentImage(imagePath, rollno)
      .then((resp) => {
        console.log("image uploaded succesfully");
        res.json({ imagePath });
      })
      .catch((err) => {
        console.error("Err while uploading image", err);
        next(new Error("Err while uploading image"));
      });
  else if (tid)
    uploadTeacherImage(imagePath, tid)
      .then((resp) => {
        console.log("image uploaded succesfully");
        res.json({ imagePath });
      })
      .catch((err) => {
        console.error("Err while uploading image", err);
        next(new Error("Err while uploading image"));
      });
  else next(new Error("first select a Image..!!!"));
});

app.get("/image", (req, res) => {
  let rollno = req.body.rollno;
  let tid = req.body.tid;
  getStudentImage(rollno)
    .then((result) =>
      res.send({
        image: result[0].image,
      })
    )
    .catch((err) => {
      next(new Error("Server is Busy right now"));
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
// insertIntoSubject("jhgjgasd", "nskd", "hsakdh", "haskhd", 3, "jhskahd")
//   .then((res) => {
//     console.log("done");
//   })
//   .catch((err) => {
//     console.log("not done", err);
//   });
app.post("/teacher/createnewsubject", (req, res, next) => {
  try {
    const { subjectname, subjectcode, semester, branch, year, allotedTeacher } =
      req.body;
    insertIntoSubject(
      subjectname,
      subjectcode,
      semester,
      branch,
      year,
      allotedTeacher
    )
      .then((resp) => {
        if (resp)
          return res.json({ message: "Subject created successfully..!" });
        else throw new Error("Req failed try again..!");
      })
      .catch((err) => {
        // console.log(err.errno);
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

app.post("/teacher", (req, res, next) => {
  const teacherid = req.query.teacherid;
  const password = req.query.password;
  // console.log(typeof teacherid, password);
  getAllTeacher(teacherid)
    .then((response) => {
      // console.log(response[0]);
      if (response[0].length == 0) throw new Error("Teacher not found");
      const { id, name, teacherId, password, department, photo } =
        response[0][0];
      res.json({
        id,
        name,
        teacherid,
        password,
        department,
        photo,
        message: "login Successfully..!!",
      });
    })
    .catch((err) => {
      // console.error("error while getting teacher", err);
      next(err);
    });
});

// // Templating engine
// app.engine("hbs", exphbs({ extname: ".hbs" }));
// app.set("view engine", "hbs");
// app.get("/", (req, res) => {
//   res.render("index");
// });
app.use(errorHandler);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
