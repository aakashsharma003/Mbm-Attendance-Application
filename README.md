Demo Video of Project

https://github.com/aakashsharma003/Mbm-Attendance-Application/assets/122847899/dad1f65c-4d0e-4a45-b917-e49c11ea8784

# Mbm Attendance Application

😥 Tired of managing student attendance with paper and spreadsheets?  

The Mbm Attendance Application is here to streamline the process!😀 
## Welcome to the repository.


This project is an attendance management application developed for MBM UNIVERSITY as a part of the Minor Project. The application aims to streamline the process of tracking and managing student attendance efficiently.

## Features

- **User Authentication**: Secure user authentication system for students and faculty members.
- **Dashboard**: Intuitive dashboard for easy navigation and access to attendance-related functionalities.
- **Mark Attendance**: Faculty members can mark attendance for their respective classes.
- **View Attendance**: Students can view their attendance records for individual subjects.
- **Attendance Reports**: Generate detailed reports of attendance for specific periods or subjects.
- **Notifications**: Automated notifications for absentees and low attendance percentages.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, ReactJs, vite
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v20.11): You can use the [package manager](https://nodejs.org/en/about/previous-releases) of your choice.
   Tests need to pass in Node 20 and 22.

## Setup Instructions

1. Clone the repository:
  `git clone https://github.com/aakashsharma003/Mbm-Attendance-Application.git`

2. Install dependencies: Run the below two commands in 2 different terminal
3. backend
  `cd Mbm-Attendance-Application cd backend npm install`
4. frontend
 `cd Mbm-Attendance-Application cd frontend npm install`

5. Set up environment variables:
- Create a \`.env\` file in the backend directory.
- Add the following environment variables:
  
```
PORT=8000
DB_HOST="localhost"
DB_USERNAME="your_username"
DB_DBNAME="your_db_name"
DB_PASSWORD="your_password"
```


  

4. Run the application:
- run the command in both frontend & backend
 `npm run dev`

5. Access the application backend in your browser at `http://localhost:8000` & frontend at `http://localhost:5173`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Additional Notes**

* For development mode specific instructions (e.g., compiling assets, starting a development server), refer to the project documentation (if available).
* Deployment instructions can be added if the application is designed to be deployed on a server.
* Consider adding screenshots showcasing the application's functionalities.
