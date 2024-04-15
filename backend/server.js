import express, { response, urlencoded } from "express";
import { engine } from "express-handlebars";
import {
  connectToDatabase,
  createAttendenceTable,
  createStudentTable,
  createSubjectTable,
  createTeacherTable,
  deleteSubject,
  getAllStudent,
  getAllStudents,
  getAllSubjects,
  getAllTeacher,
  getStudentImage,
  getSubject,
  getTeacherImage,
  insertData,
  insertIntoSubject,
  insertIntoTeacher,
  insertTeacherData,
  updateSubject,
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
import path from "path";
import urid from "urid";

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

// createAttendenceTable()
//   .then((res) => {
//     console.log("Attendence table created successfully.!");
//   })
//   .catch((err) => {
//     console.log("Error while creating attendence table", err);
//   });

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${req.customFileName}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
const extractFileName = (req, res, next) => {
  req.customFileName = req.headers["filename"];
  next();
};
app.post(
  "/uploadImage",
  extractFileName,
  upload.single("profileImage"),
  async (req, res, next) => {
    // Access uploaded image details (consider error handling for file upload)
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Validate and handle missing image or body data
    if (!imagePath) {
      return res.status(400).json({ message: "Missing image file" });
    }

    const rollno = req.body.rollno;
    const teacherId = req.body.teacherId;

    if (!rollno && !teacherId) {
      return res
        .status(400)
        .json({ message: "Please provide either rollno or teacherId" });
    }

    try {
      // Upload based on available data
      console.log(rollno, teacherId);
      if (teacherId === "undefined") {
        await uploadStudentImage(imagePath, rollno);
        console.log("Image uploaded successfully (student)");
      } else if (rollno === "undefined") {
        await uploadTeacherImage(imagePath, teacherId);
        console.log("Image uploaded successfully (teacher)");
      }

      res.json({ imagePath, message: "Image uploaded successfully!" });
    } catch (err) {
      console.error("Error uploading image:", err);
      next(new Error("Image upload failed")); // Consider a more specific error message
    }
  }
);

// app.get("/image", (req, res, next) => {
//   let rollno = req.query.rollno;
//   let teacherId = req.query.teacherId;
//   if (rollno) {
//     getStudentImage(rollno)
//       .then((data) => {
//         console.log(data);
//         res.json({
//           path: data[0][0].photo,
//         });
//       })
//       .catch((err) => {
//         next(new Error("Pls update your Profile Image..!!"));
//       });
//   } else if (teacherId) {
//     getTeacherImage(teacherId)
//       .then((data) => {
//         console.log(data[0][0].photo);
//         res.json({
//           path: data[0][0].photo,
//         });
//       })
//       .catch((err) => {
//         next(new Error("Pls update your Profile Image..!!"));
//       });
//   } else {
//     next(new Error("Profile photo not found"));
//   }
// });

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
    const {
      subjectname,
      subjectcode,
      semester,
      branch,
      degree,
      allotedTeacher,
      year,
    } = req.body;
    const subjectId = urid();
    // console.log(subjectId);
    insertIntoSubject(
      subjectId,
      subjectname,
      subjectcode,
      semester,
      branch,
      degree,
      allotedTeacher,
      year
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
        teacherId,
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

app.get("/allsubjects", (req, res, next) => {
  const teacherid = req.query.teacherid;
  getAllSubjects(teacherid)
    .then((resp) => {
      const subjects = resp[0];
      // console.log(resp[0]);
      res.json({
        subjects,
      });
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/deleteSubject:id", (req, res, next) => {
  const subjectId = req.params.id;
  console.log(subjectId);
  deleteSubject(subjectId)
    .then((resp) => {
      res.send({ message: "deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      next("Pls try again after some time !");
    });
});
app.get("/getstudents:id", (req, res, next) => {
  const subjectid = req.params.id;
  getSubject(subjectid)
    .then((resp) => {
      const {
        subjectid,
        subjectname,
        subjectcode,
        semester,
        branch,
        degree,
        allotedTeacher,
        year,
      } = resp[0][0];
      // console.log(semester, branch);
      req.subjectname = subjectname;
      return getAllStudents(semester, branch)
        .then((resp) => {
          // console.log(resp);
          res.send({
            subjectname: req.subjectname,
            students: resp[0],
            message: "All students fetched successfully..!",
          });
        })
        .catch((err) => {
          console.log("error occured while getting all students..!");
          next(new Error("error occured while getting all students..!"));
        });
    })
    .catch((err) => {
      console.log("Error occured while getting subject ", err);
      next(new Error("Our Server is Busy right Now!"));
    });
});
app.post("/teacher/editSubject", (req, res, next) => {
  const { subjectid, subjectname, subjectcode, semester, branch, degree } =
    req.body;
  updateSubject(subjectid, subjectname, subjectcode, semester, branch, degree)
    .then((resp) => {
      res.send({ message: "Subject info Updated Successfully" });
    })
    .catch((err) => {
      console.log(err);
      next("Pls try again after some time !");
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
