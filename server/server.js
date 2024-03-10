import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sticlasskode"
})

//authentication of the account logged in
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "Is not Authenticated"});
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({Message: "Authentication Error."});
            } else {
                req.Name = decoded.Name;
                req.UserLevel = decoded.UserLevel
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", Name: req.Name, UserLevel: req.UserLevel});
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM tbl_user WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        if (data.length > 0) {
            const FirstName = data[0].FirstName;
            const LastName = data[0].LastName;
            const UserLevel = data[0].UserLevel;
            const Name = LastName.concat(" ", FirstName);
            const token = jwt.sign({Name, UserLevel}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Message: "No Records Found"})
        }
    })
})

//de-authentication of the account that was logged in
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

//checks of the server is running
app.listen(8081, () => {
    console.log("Running")
})

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));

/* ==============================================
    This section pertains to CRUD Operations:
        1. CREATE
        2. READ
        3. UPDATE
        4. DELETE
===============================================*/

// CREATE: creating data to the database
// User
app.post('/add-user', (req, res) => {
    const sql = "INSERT INTO tbl_user ( `SchoolID`, `FirstName`, `LastName`, `Birthday`, `UserLevel`) VALUES (?)"
    const values = [
        req.body.SchoolID,
        req.body.FirstName,
        req.body.LastName,
        req.body.Birthday,
        req.body.UserLevel,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// User
app.post('/add-section', (req, res) => {
    const sql = "INSERT INTO tbl_section (`Name`, `Level`, `Semester`) VALUES (?)"
    const values = [
        req.body.Name,
        req.body.Level,
        req.body.Semester
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// User
app.post('/add-course', (req, res) => {
    const sql = "INSERT INTO tbl_course (`Name`, `CourseCode`, `Type`, `Description`, `Category`) VALUES (?)"
    const values = [
        req.body.Name,
        req.body.CourseCode,
        req.body.Type,
        req.body.Description,
        req.body.Category
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// User
app.post('/add-schoolfacility', (req, res) => {
    const sql = "INSERT INTO tbl_schoolfacility (`Name`, `Capacity`, `Type`, `Building`) VALUES (?)"
    const values = [
        req.body.Name,
        req.body.Capacity,
        req.body.Type,
        req.body.Building
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Program
app.post('/add-program', (req, res) => {
    const sql = "INSERT INTO tbl_program (`Name`, `ProgramCode`, `Description`, `Category`) VALUES (?)"
    const values = [
        req.body.Name,
        req.body.ProgramCode,
        req.body.Description,
        req.body.Category
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

// READ: extracting data from the database
// Program
app.get('/view-user', (req, res) => {
    const sql = "SELECT * FROM tbl_user WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
app.get('/view-program', (req, res) => {
    const sql = "SELECT * FROM tbl_program WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Section
app.get('/view-section', (req, res) => {
    const sql = "SELECT * FROM tbl_section WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Student
app.get('/view-student', (req, res) => {
    const sql = "SELECT * FROM tbl_student WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Course
app.get('/view-course', (req, res) => {
    const sql = "SELECT * FROM tbl_course WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Faculty Member
app.get('/view-facultymember', (req, res) => {
    const sql = "SELECT * FROM tbl_facultymember WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// School Facility
app.get('/view-schoolfacility', (req, res) => {
    const sql = "SELECT * FROM tbl_schoolfacility WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Student Section
app.get('/view-studentsection', (req, res) => {
    const sql = "SELECT tbl_student.StudentID, jnc_studentsection.SectionID, tbl_student.FirstName, tbl_student.LastName FROM tbl_student INNER JOIN jnc_studentsection ON tbl_student.StudentID = jnc_studentsection.StudentID";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

// UPDATE: updating data to the database
// Student
app.post('/update-student', (req, res) => {
    const sql = "UPDATE tbl_student SET SchoolStudentID = ?, FirstName = ?, MiddleName = ?, LastName = ?, StudentType = ?, ContactNumber = ?, Address = ? WHERE StudentID = ?"
    db.query(sql, [req.body.SchoolStudentID,
                   req.body.FirstName,
                   req.body.MiddleName,
                   req.body.LastName,
                   req.body.StudentType,
                   req.body.ContactNumber,
                   req.body.Address, 
                   req.body.StudentID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Faculty Member
app.post('/update-facultymember', (req, res) => {
    const sql = "UPDATE tbl_facultymember SET SchoolFacultyMemberID = ?, FirstName = ?, MiddleName = ?, LastName = ?, FacultyMemberType = ?, FacebookLink = ?, ContactNumber = ?, Address = ? WHERE FacultyMemberID = ?"
    db.query(sql, [req.body.SchoolFacultyMemberID,
                   req.body.FirstName,
                   req.body.MiddleName,
                   req.body.LastName,
                   req.body.FacultyMemberType,
                   req.body.FacebookLink,
                   req.body.ContactNumber,
                   req.body.Address, 
                   req.body.FacultyMemberID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Course
app.post('/update-course', (req, res) => {
    const sql = "UPDATE tbl_course SET Name = ?, CourseCode = ?, Type = ?, Description = ?, Category = ? WHERE CourseID = ?"
    db.query(sql, [req.body.Name,
                   req.body.CourseCode,
                   req.body.Type,
                   req.body.Description,
                   req.body.Category,
                   req.body.CourseID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Section
app.post('/update-section', (req, res) => {
    const sql = "UPDATE tbl_section SET Name = ?, Level = ?, Semester = ? WHERE SectionID = ?"
    db.query(sql, [req.body.Name,
                   req.body.Level,
                   req.body.Semester, 
                   req.body.SectionID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// School Facility
app.post('/update-schoolfacility', (req, res) => {
    const sql = "UPDATE tbl_schoolfacility SET Name = ?, Capacity = ?, Type = ?, Building = ? WHERE SchoolFacilityID = ?"
    db.query(sql, [req.body.Name,
                   req.body.Capacity,
                   req.body.Type,
                   req.body.Building, 
                   req.body.SchoolFacilityID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Program
app.post('/update-program', (req, res) => {
    const sql = "UPDATE tbl_program SET Name = ?, ProgramCode = ?, Description = ?, Category = ? WHERE ProgramID = ?"
    db.query(sql, [req.body.Name,
                   req.body.ProgramCode,
                   req.body.Description,
                   req.body.Category, 
                   req.body.ProgramID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// User
app.post('/update-user', (req, res) => {
    const sql = "UPDATE tbl_user SET SchoolID = ?, FirstName = ?, LastName = ?, Birthday = ?, UserLevel = ? WHERE UserID = ?"
    db.query(sql, [req.body.SchoolID,
                   req.body.FirstName,
                   req.body.LastName,
                   req.body.Birthday,
                   req.body.UserLevel, 
                   req.body.UserID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})


// DELETE: updating data to the database
// Student
app.post('/delete-student', (req, res) => {
    const sql = "UPDATE tbl_user SET Status = ? WHERE UserID = ?"
    db.query(sql, ["Archive", req.body.UserID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})// 