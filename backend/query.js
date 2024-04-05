// query.js file

import mysql from "mysql2/promise";

import { data } from "./data.js";

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
  }
}

async function createTeacherTable() {
  try {
    const db = await connectToDatabase();

    const result = await db.query(`
      CREATE TABLE IF NOT EXISTS teacher (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL
      )
    `);

    console.log(result);
  } catch (error) {
    console.error("Error creating teacher table:", error);
  }
}

async function insertIntoStudent(
  name,
  rollno,
  password,
  semester,
  branch,
  year
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
  }
}

export {
  insertData,
  getAllStudent,
  insertIntoStudent,
  connectToDatabase,
  createStudentTable,
  createTeacherTable,
};
