// query.js file

import mysql from "mysql2/promise";
import "dotenv/config";
import { data } from "./data.js";
import { TeacherData } from "./data.js";
// const localhost = process.env.DB_HOST;
// const db_user = process.env.DB_USERNAME;
// const db_password = process.env.DB_PASSWORD;
// const db_name = process.env.DB_DBNAME;
async function connectToDatabase() {
  try {
    // Create the connection to database
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "attendenceweb",
      password: "1234",
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
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rollno VARCHAR(50) UNIQUE NOT NULL,
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
        Photo VARCHAR(255)
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
        id INT AUTO_INCREMENT PRIMARY KEY,
        subjectname VARCHAR(255) NOT NULL,
        subjectcode VARCHAR(255) UNIQUE NOT NULL,
        semester VARCHAR(50) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        allottedTeacher VARCHAR(150) NOT NULL
      )
    `);

    console.log(result);
  } catch (error) {
    console.error("Error creating teacher table:", error);
    throw error;
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
  subjectname,
  subjectcode,
  semester,
  branch,
  year,
  allottedTeacher
) {
  try {
    const db = await connectToDatabase();

    const res = await db.query(
      `INSERT INTO subject (subjectname, subjectcode, semester, branch, year, allottedTeacher) 
      VALUES (?,?,?,?,?,?)`,
      [subjectname, subjectcode, semester, branch, year, allottedTeacher]
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
    const sqlInsert = "update student set photo = ?  where rollno = ?";
    const res = await db.query(sqlInsert, [image, rollno]);
    return res;
  } catch (err) {
    console.error("Error while updating photo in student table:", err);
    throw err;
  }
}

async function uploadTeacherImage(image, teacherId) {
  try {
    console.log(image, tid);
    const db = await connectToDatabase();
    const sqlInsert = "update teacher set photo = ?  where tid = ?";
    const res = await db.query(sqlInsert, [image, tid]);
    return res;
  } catch (err) {
    console.error("Error while updating photo in teacher table:", err);
    throw err;
  }
}
async function getStudentImage({ rollno }) {
  try {
    const db = await connectToDatabase();
    const sqlQuery = "update student SET photo=? where rollno=?";
    const [rows] = await db.query(sqlQuery, [rollno]);
    console.log(rows);
    return rows;
  } catch (err) {
    console.error("Error while updating photo in teacher table:", err);
    throw err;
  }
}
export {
  insertData,
  insertTeacherData,
  getAllStudent,
  getAllTeacher,
  createSubjectTable,
  insertIntoSubject,
  insertIntoStudent,
  insertIntoTeacher,
  connectToDatabase,
  createStudentTable,
  createTeacherTable,
  uploadStudentImage,
  uploadTeacherImage,
  getStudentImage,
};
