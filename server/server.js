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
    database: "db_sticlasskode"
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
                req.UserType = decoded.UserType
                req.UUID = decoded.UUID
                req.File_Maintainance = decoded.File_Maintainance
                req.Access_View = decoded.Access_View
                req.Access_Edit = decoded.Access_Edit
                req.Access_Insert = decoded.Access_Insert
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", 
                     Name: req.Name, 
                     UserType: req.UserType,
                     UUID: req.UUID,
                     File_Maintainance: req.File_Maintainance,
                     Access_View: req.Access_View,
                     Access_Edit: req.Access_Edit,
                     Access_Insert: req.Access_Insert,
})})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM tbl_user INNER JOIN tbl_permission ON tbl_user.UUID=tbl_permission.UUID WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        if (data.length > 0) {
            const FirstName = data[0].FirstName;
            const LastName = data[0].LastName;
            const UserType = data[0].UserType;
            const UUID = data[0].UUID;
            const Name = LastName.concat(", ", FirstName);

            const File_Maintainance = data[0].File_Maintainance
            const Access_View = data[0].Access_View
            const Access_Edit = data[0].Access_Edit
            const Access_Insert = data[0].Access_Insert

            const token = jwt.sign({Name, 
                                    UserType, 
                                    UUID, 
                                    File_Maintainance, 
                                    Access_View, 
                                    Access_Edit, 
                                    Access_Insert,
            }, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
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
// Schedule
app.get('/view-schedule', (req, res) => {
    const sql = "SELECT * FROM tbl_schedules WHERE Status='Active'";
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
// User
app.post('/delete-user', (req, res) => {
    const sql = "UPDATE tbl_user SET Status = ? WHERE UserID = ?"
    db.query(sql, ["Archive", req.body.UserID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
}) 
// Program
app.post('/delete-program', (req, res) => {
    const sql = "UPDATE tbl_program SET Status = ? WHERE ProgramID = ?"
    db.query(sql, ["Archive", req.body.ProgramID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
}) 
// Facility
app.post('/delete-schoolfacility', (req, res) => {
    const sql = "UPDATE tbl_schoolfacility SET Status = ? WHERE SchoolFacilityID = ?"
    db.query(sql, ["Archive", req.body.SchoolFacilityID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
}) 
// Section
app.post('/delete-section', (req, res) => {
    const sql = "UPDATE tbl_section SET Status = ? WHERE SectionID = ?"
    db.query(sql, ["Archive", req.body.SectionID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 



/*
    Section 1: Creating of Data

    The following codes are used to create data inserted by the user at client then sent into server which is saved unto database.
    This section contains INSERT INTO function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post('/create-course', (req, res) => {
    const sql = "INSERT INTO tbl_course (`CourseCode`, `CourseName`, `Units`, `LessonType`, `PRGID`) VALUES (?)"
    const values = [
        req.body.CourseCode,
        req.body.CourseName,
        req.body.Units,
        req.body.LessonType,
        req.body.PRGID,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
}) 



/*
    Section 2: Displaying of Data

    The following codes are used to display data sent from the database to server to client.
    This section contains SELECT function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

/* 

    Part 1: Displaying of Data for Tables

*/
app.post('/display-user', (req, res) => {
    const sql = "SELECT * FROM tbl_user " +
                
                "WHERE " + 
                    "Deleted='False' AND UUID LIKE '%"+ req.body.Search +"%' OR " + 
                    "Deleted='False' AND FirstName LIKE '%"+ req.body.Search +"%' OR " + 
                    "Deleted='False' AND LastName LIKE '%"+ req.body.Search +"%' OR " + 
                    "Deleted='False' AND UserType LIKE '%"+ req.body.Search +"%'"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

app.post('/display-course-program', (req, res) => {
    const sql = "SELECT * FROM tbl_course " + 
                
                "INNER JOIN " + 
                    "tbl_program ON tbl_course.PRGID = tbl_program.PRGID " + 
                    
                "WHERE " + 
                    "tbl_course.Deleted='False' AND tbl_course.CourseName LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_course.Deleted='False' AND tbl_program.ProgramName LIKE '%"+ req.body.Search +"%' " + 
                    
                "ORDER " + 
                    "BY tbl_course.CRSID"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
})

/* 

    Part 2: Displaying of Data for Input Boxes

*/

app.post('/display-input-program', (req, res) => {
    const sql = "SELECT * FROM tbl_program WHERE Deleted='False'"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

app.post('/display-input-section', (req, res) => {
    const sql = "SELECT * FROM tbl_section WHERE Deleted='False'"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

/*
    Section 3: Updating of Data

    The following codes are used to update data sent from the client then sent into server which is saved unto database.
    This section contains UPDATE SET function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post('/update-course', (req, res) => {
    const sql = "UPDATE tbl_course SET CourseCode = ?, CourseName = ?, Units = ?, LessonType = ?, PRGID = ? WHERE CRSID = ?"
    db.query(sql, [req.body.CourseCode,
                   req.body.CourseName,
                   req.body.Units,
                   req.body.LessonType,
                   req.body.PRGID,
                   req.body.CRSID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

/*
    Section 4: Deletion of Data

    The following codes are used to delete data sent from the client then sent into server which is saved unto database.
    This section contains UPDATE SET function of the mysql with searching capabilities such as WHERE clause
    and LIKE operator.
*/

app.post('/delete-course', (req, res) => {
    const sql = "UPDATE tbl_course SET Deleted = ? WHERE CRSID = ?"
    db.query(sql, ["True", req.body.CRSID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})