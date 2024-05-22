// query.js file

import mysql from "mysql2/promise";
import "dotenv/config";
import { data } from "./data.js";
import { TeacherData } from "./data.js";

async function connectToDatabase() {
  try {
    // Create the connection to database
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      database: process.env.DB_DBNAME,
      password: process.env.DB_PASSWORD,
    });

    return db;
  } catch (error) {
    console.error("Database Connection Failed !!!", error);
    throw error;
  }
}

async function createStudentTable() {
  try {
    const db = await connectToDatabase();

    const result = await db.query(`
      CREATE TABLE IF NOT EXISTS student (
        id INT AUTO_INCREMENT UNIQUE  NOT NULL,
        name VARCHAR(255) NOT NULL,
        rollno VARCHAR(50) PRIMARY KEY,
        password VARCHAR(100) NOT NULL,
        semester VARCHAR(150) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        photo VARCHAR(255)
      )
    `);

    console.log(result);
  } catch (error) {
    console.error("Error creating student table:", error);
    throw error;
  }
}

async function createTeacherTable() {
  try {
    const db = await connectToDatabase();

    const result = await db.query(`
      CREATE TABLE IF NOT EXISTS teacher (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        teacherId VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        department VARCHAR(255) NOT NULL,
        photo VARCHAR(255)
      )
    `);

    console.log(result);
  } catch (error) {
    console.error("Error creating teacher table:", error);
    throw error;
  }
}
async function createSubjectTable() {
  try {
    const db = await connectToDatabase();

    const result = await db.query(`
      CREATE TABLE IF NOT EXISTS subject (
        subjectid VARCHAR(255) UNIQUE PRIMARY KEY,
        subjectname VARCHAR(255) NOT NULL,
        subjectcode VARCHAR(255) UNIQUE NOT NULL,
        semester VARCHAR(50) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        allottedTeacher VARCHAR(150) NOT NULL,
        year INT NOT NULL
      )
    `);

    console.log(result);
  } catch (error) {
    console.error("Error creating teacher table:", error);
    throw error;
  }
}
async function createRecordsTable() {
  try {
    const db = await connectToDatabase();

    const res = await db.query(`
    CREATE TABLE IF NOT EXISTS Records(
        srno INT AUTO_INCREMENT PRIMARY KEY,
        subjectid VARCHAR(255) NOT NULL,
        subjectname VARCHAR(255) NOT NULL,
        studentname VARCHAR(255) NOT NULL,
        photo VARCHAR(255),
        ispresent BOOLEAN NOT NULL, 
        year INT NOT NULL,
        branch VARCHAR(255) NOT NULL,
        semester VARCHAR(255) NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log(res);
    return res;
  } catch (err) {
    console.log("Error occurred while creating records table!", err);
    throw err;
  }
}
async function createAttendanceTable() {
  try {
    const db = await connectToDatabase();

    const res = await db.query(`
    CREATE TABLE IF NOT EXISTS Attendance (
       attendance_id INT AUTO_INCREMENT PRIMARY KEY,
        student_id Varchar(255) NOT NULL,
        subject_id varChar(255) NOT NULL,
        student_name varchar(255) NOT NULL,
       attendance_date DATE,
        status ENUM('Present', 'Absent'),
       FOREIGN KEY (student_id) REFERENCES Student(rollno),
      FOREIGN KEY (subject_id) REFERENCES Subject(subjectid)
      )
    `);

    console.log(res);
    return res;
  } catch (err) {
    console.log("Error occurred while creating attendance table!", err);
    throw err;
  }
}

async function insertIntoTeacher(name, teacherId, password, department, photo) {
  try {
    const db = await connectToDatabase();

    const result = await db.query(
      `
      INSERT INTO teacher (name, teacherid, password, department) 
      VALUES (?, ?, ?, ?)
    `,
      [name, teacherId, password, department]
    );
    console.log(result);
  } catch (err) {
    console.error("Error while inserting in student table:", err);
    throw err;
  }
}
async function insertIntoStudent(
  name,
  rollno,
  password,
  semester,
  branch,
  year,
  photo
) {
  try {
    const db = await connectToDatabase();

    const result = await db.query(
      `
      INSERT INTO student (name, rollno, password, semester, branch, year) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [name, rollno, password, semester, branch, year]
    );
    console.log(result);
  } catch (err) {
    console.error("Error while inserting in student table:", err);
    throw err;
  }
}

async function insertData() {
  try {
    for (let index = 0; index < data.length; index++) {
      let { name, rollno, password, semester, branch, year } = data[index];
      await insertIntoStudent(name, rollno, password, semester, branch, year);
      console.log(`${name} inserted successfully`);
    }
  } catch (err) {
    console.error("Error while inserting data:", err);
    throw err;
  }
}

async function insertTeacherData() {
  try {
    for (let index = 0; index < TeacherData.length; index++) {
      let { name, teacherId, password, department } = TeacherData[index];
      await insertIntoTeacher(name, teacherId, password, department);
      console.log(`${name} inserted successfully`);
    }
  } catch (err) {
    console.error("Error while inserting data:", err);
    throw err;
  }
}
async function getAllStudent(rollno) {
  try {
    const db = await connectToDatabase();

    const result = await db.query(
      `
      select * from student where rollno=?;
    `,
      [rollno]
    );

    return result;
  } catch (error) {
    console.error("Error while getting all students:", error);
    throw error;
  }
}
async function getAllTeacher(teacherId) {
  try {
    const db = await connectToDatabase();
    // console.log(teacherId[0]);
    const result = await db.query(
      `
      select * from teacher where teacherid=?;
    `,
      [teacherId]
    );

    return result;
  } catch (error) {
    console.error("Error while getting all teacher:", error);
    throw error;
  }
}
async function insertIntoSubject(
  subjectid,
  subjectname,
  subjectcode,
  semester,
  branch,
  degree,
  allotedTeacher,
  year
) {
  try {
    const db = await connectToDatabase();

    const res = await db.query(
      `INSERT INTO subject (subjectid, subjectname, subjectcode, semester, branch, degree, allottedTeacher, year) 
      VALUES (?,?,?,?,?,?,?,?)`,
      [
        subjectid,
        subjectname,
        subjectcode,
        semester,
        branch,
        degree,
        allotedTeacher,
        year,
      ]
    );
    return res;
  } catch (err) {
    console.error("Error while inserting subject:", err);
    throw err;
  }
}

async function uploadStudentImage(image, rollno) {
  try {
    console.log(image, rollno);
    const db = await connectToDatabase();
    const sqlInsert = "update student set photo = ? where rollno = ?";
    const res = await db.query(sqlInsert, [image, rollno]);
    return res;
  } catch (err) {
    console.error("Error while updating photo in student table:", err);
    throw err;
  }
}

async function uploadTeacherImage(image, teacherId) {
  try {
    console.log(image, teacherId);
    const db = await connectToDatabase();
    const sqlInsert = "update teacher set photo = ? where teacherId = ?";
    const res = await db.query(sqlInsert, [image, teacherId]);
    return res;
  } catch (err) {
    console.error("Error while updating photo in teacher table:", err);
    throw err;
  }
}
async function getStudentImage(rollno) {
  try {
    const db = await connectToDatabase();
    const sqlQuery = "select photo from student where rollno=?";
    const res = await db.query(sqlQuery, [rollno]);
    // console.log(res);
    return res;
  } catch (err) {
    console.error("Error while updating photo in teacher table:", err);
    throw err;
  }
}
async function getAllSubjects(teacherId) {
  try {
    const db = await connectToDatabase();
    if (teacherId.length == 0) {
      const sqlQuery = "select * from subject";
      const res = await db.query(sqlQuery, [teacherId]);
      return res;
    } else {
      const sqlQuery = "select * from subject where allottedTeacher = ?";
      const res = await db.query(sqlQuery, [teacherId]);
      return res;
    }
  } catch (err) {
    console.error(
      "Error while getting all subjects with given teacherid:",
      err
    );
    throw err;
  }
}
async function getTeacherImage(teacherId) {
  try {
    const db = await connectToDatabase();
    const sqlQuery = "select photo from teacher where teacherid=?";
    const res = await db.query(sqlQuery, [teacherId]);
    // console.log(res);
    return res;
  } catch (err) {
    console.error("Error while updating photo in teacher table:", err);
    throw err;
  }
}

async function deleteSubject(subjectId) {
  try {
    console.log(subjectId);
    const db = await connectToDatabase();
    const sqlQuery = "delete from subject where subjectid = ?";
    const res = await db.query(sqlQuery, [subjectId]);
    // console.log(res);
    return res;
  } catch (err) {
    console.error("Error while deleting subject:", err);
    throw err;
  }
}
async function updateSubject(
  subjectId,
  subjectname,
  subjectcode,
  semester,
  branch,
  degree
) {
  try {
    // console.log(subjectId);
    const db = await connectToDatabase();
    const sqlQuery =
      "UPDATE subject SET subjectname = ?, subjectcode = ?,semester= ? , branch = ? ,degree = ? WHERE subjectid = ?";
    const res = await db.query(sqlQuery, [
      subjectname,
      subjectcode,
      semester,
      branch,
      degree,
      subjectId,
    ]);
    // console.log(res);
    return res;
  } catch (err) {
    console.error("Error while updating subject data:", err);
    throw err;
  }
}
async function getSubject(subjectid) {
  try {
    const db = await connectToDatabase();
    // console.log(teacherId[0]);
    const query = "select * from subject where subjectid=?";
    const result = await db.query(query, [subjectid]);

    return result;
  } catch (error) {
    console.error("Error while getting subject from subjectId:", error);
    throw error;
  }
}
async function getAllStudents(semester, branch) {
  try {
    const db = await connectToDatabase();
    // console.log(teacherId[0]);
    const result = await db.query(
      `
      select * from student where semester = ? and branch = ?
    `,
      [semester, branch]
    );

    return result;
  } catch (error) {
    console.error("Error while getting all student for attendence:", error);
    throw error;
  }
}
async function insertIntoAttendance(studentid, subjectid, studentname, status) {
  try {
    const db = await connectToDatabase();

    const query =
      "INSERT INTO attendance (student_id, subject_id, status,student_name, attendance_date) VALUES (?,?,?,?,CURDATE())";
    const res = await db.query(query, [
      studentid,
      subjectid,
      status,
      studentname,
    ]);
    return res;
  } catch (err) {
    console.error("Error while inserting or updating attendance table:", err);
    throw err;
  }
}

async function insertIntoRecords(
  subjectid,
  subjectname,
  studentname,
  photo,
  ispresent,
  year,
  branch,
  semester
) {
  try {
    const db = await connectToDatabase();

    const query =
      "INSERT INTO records (subjectid, subjectname, studentname, photo, ispresent, year, branch, semester) VALUES (?,?,?,?,?,?,?,?)";
    const res = await db.query(query, [
      subjectid,
      subjectname,
      studentname,
      photo,
      ispresent,
      year,
      branch,
      semester,
    ]);
    return res;
  } catch (err) {
    console.error("Error while inserting into Records table:", err);
    throw err;
  }
}
async function insertattendance(data) {
  try {
    for (let index = 0; index < data.length; index++) {
      let { studentid, subjectid, studentname, photo, ispresent, subjectname } =
        data[index];
      ispresent = ispresent ? "Present" : "Absent";
      await insertIntoAttendance(studentid, subjectid, studentname, ispresent);
    }
    console.log(`All attendance saved successfully`);
    // return res;
  } catch (err) {
    console.error("Error while saving attendance:", err);
    throw err;
  }
}
async function getAttendance(subjectId, from, to) {
  try {
    const db = await connectToDatabase();
    const query = `SELECT 
    student_id, 
    SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS total_present, 
    SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS total_absent, 
    COUNT(*) AS total_lectures 
FROM 
    attendance 
WHERE 
    subject_id = ? 
    AND attendance_date >= ? 
    AND attendance_date <= ? 
GROUP BY 
    student_id
`;
    const res = await db.query(query, [subjectId, "2024-05-02", "2024-05-20"]);
    console.log(res);
    return res[0];
  } catch (err) {
    console.error("Error while getting attendance:", err);
    throw err;
  }
}
async function viewAttendence(subjectid) {
  try {
    const db = await connectToDatabase();
    //total_present
    // console.log(studentid);
    const query = `SELECT 
    student_id,
    SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS total_present,
    SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS total_absent,
    COUNT(*) AS total_lectures
FROM attendance
WHERE subject_id = ?
GROUP BY student_id
`;
    // const query2 =
    //   "select count(status) as total from attendance where subject_id=?";
    const res = await db.query(query, [subjectid]);
    // console.log(res);
    return res[0];
  } catch (err) {
    console.error("Error while viewing Attendence:", err);
  }
}
export {
  insertData,
  insertIntoRecords,
  insertIntoAttendance,
  insertattendance,
  createRecordsTable,
  insertTeacherData,
  getAllStudent,
  getAllStudents,
  getAllTeacher,
  getAttendance,
  createSubjectTable,
  createAttendanceTable,
  insertIntoSubject,
  insertIntoStudent,
  insertIntoTeacher,
  connectToDatabase,
  createStudentTable,
  createTeacherTable,
  uploadStudentImage,
  uploadTeacherImage,
  getStudentImage,
  getTeacherImage,
  getAllSubjects,
  getSubject,
  deleteSubject,
  updateSubject,
  viewAttendence,
};
