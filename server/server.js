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

app.post('/create-coach', (req, res) => {
    const sql = "INSERT INTO tbl_coach (`SCHLID`, `FirstName`, `MiddleInitial`, `LastName`, `Type`, `Units`, `DPTID`, `Email`, `ContactNumber`, `Facebook`) VALUES (?)"
    const values = [
        req.body.SCHLID,
        req.body.FirstName,
        req.body.MiddleInitial,
        req.body.LastName,
        req.body.Type,
        req.body.Units,
        req.body.DPTID,
        req.body.Email,
        req.body.ContactNumber,
        req.body.Facebook,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/create-program', (req, res) => {
    const sql = "INSERT INTO tbl_program (`ProgramCode`, `ProgramName`, `ProgramAbbrev`, `ProgramDescription`, `DPTID`) VALUES (?)"
    const values = [
        req.body.ProgramCode,
        req.body.ProgramName,
        req.body.Abbrev,
        req.body.Description,
        req.body.DPTID,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/create-room', (req, res) => {
    const sql = "INSERT INTO tbl_room (`RoomName`, `Capacity`, `Type`, `Building`, `Floor`) VALUES (?)"
    const values = [
        req.body.RoomName,
        req.body.Capacity,
        req.body.Type,
        req.body.Building,
        req.body.Floor,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/create-section', (req, res) => {
    const sql = "INSERT INTO tbl_section (`SectionName`, `Population`, `Year`, `Semester`, `PRGID`) VALUES (?)"
    const values = [
        req.body.SectionName,
        req.body.Population,
        req.body.Year,
        req.body.Semester,
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
                    "Deleted='False' AND DateCreated LIKE '%"+ req.body.Search +"%' OR " + 
                    "Deleted='False' AND UserType LIKE '%"+ req.body.Search +"%'"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

app.post('/display-course', (req, res) => {
    const sql = "SELECT * FROM tbl_course " + 
                
                "INNER JOIN " + 
                    "tbl_program ON tbl_course.PRGID = tbl_program.PRGID " + 
                    
                "WHERE " + 
                    "tbl_course.Deleted='False' AND tbl_course.CourseCode LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_course.Deleted='False' AND tbl_course.CourseName LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_course.Deleted='False' AND tbl_course.Units LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_course.Deleted='False' AND tbl_course.LessonType LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_course.Deleted='False' AND tbl_course.DateCreated LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_course.Deleted='False' AND tbl_program.ProgramName LIKE '%"+ req.body.Search +"%' " + 
                    
                "ORDER " + 
                    "BY tbl_course.CRSID"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
})

app.post('/display-coach', (req, res) => {
    const sql = "SELECT * FROM tbl_coach " + 

                "INNER JOIN " + 
                    "tbl_department ON tbl_coach.DPTID = tbl_department.DPTID " + 

                "WHERE " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.FirstName LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.MiddleInitial LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.LastName LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.Type LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.Units LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.Email LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.ContactNumber LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_coach.DateCreated LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_coach.Deleted='False' AND tbl_department.DepartmentName LIKE '%"+ req.body.Search +"%' " + 
                    
                "ORDER " + 
                    "BY tbl_coach.CCHID"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
})

app.post('/display-program', (req, res) => {
    const sql = "SELECT * FROM tbl_program " +

                "INNER JOIN " + 
                    "tbl_department ON tbl_program.DPTID = tbl_department.DPTID " + 
                
                "WHERE " + 
                    "tbl_program.Deleted='False' AND tbl_program.ProgramCode LIKE '%"+ req.body.Search +"%' OR " + 
                    "tbl_program.Deleted='False' AND tbl_program.ProgramName LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_program.Deleted='False' AND tbl_program.ProgramAbbrev LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_program.Deleted='False' AND tbl_program.DateCreated LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_program.Deleted='False' AND tbl_department.DepartmentName LIKE '%"+ req.body.Search +"%' " +  
                    
                "ORDER " + 
                    "BY tbl_program.PRGID"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

app.post('/display-room', (req, res) => {
    const sql = "SELECT * FROM tbl_room " +

                "WHERE " + 
                    "Deleted='False' AND RoomName LIKE '%"+ req.body.Search +"%' OR " + 
                    "Deleted='False' AND Capacity LIKE '%"+ req.body.Search +"%' OR " +
                    "Deleted='False' AND Type LIKE '%"+ req.body.Search +"%' OR " +
                    "Deleted='False' AND Building LIKE '%"+ req.body.Search +"%' OR " +
                    "Deleted='False' AND Floor LIKE '%"+ req.body.Search +"%' OR " +
                    "Deleted='False' AND DateCreated LIKE '%"+ req.body.Search +"%' " +  
                    
                "ORDER " + 
                    "BY RMID"
                    
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"})
        return res.json(data)
    })
}) 

app.post('/display-section', (req, res) => {
    const sql = "SELECT * FROM tbl_section " +
                
                "INNER JOIN " + 
                    "tbl_program ON tbl_section.PRGID = tbl_program.PRGID " + 

                "WHERE " + 
                    "tbl_section.Deleted='False' AND tbl_section.SectionName LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_section.Population LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_section.Year LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_section.Semester LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_section.PRGID LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_section.DateCreated LIKE '%"+ req.body.Search +"%' OR " +
                    "tbl_section.Deleted='False' AND tbl_program.ProgramName LIKE '%"+ req.body.Search +"%'" +
                    
                "ORDER " + 
                    "BY tbl_section.SCTID"
                    
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

app.post('/display-input-department', (req, res) => {
    const sql = "SELECT * FROM tbl_department WHERE Deleted='False'"
                    
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

app.post('/update-coach', (req, res) => {
    const sql = "UPDATE tbl_coach SET SCHLID = ?, FirstName = ?, MiddleInitial = ?, LastName = ?, Type = ?, Units = ?, DPTID = ?, Email = ?, ContactNumber = ?, Facebook = ?  WHERE CCHID = ?"
    db.query(sql, [req.body.SCHLID,
                   req.body.FirstName,
                   req.body.MiddleInitial,
                   req.body.LastName,
                   req.body.Type,
                   req.body.Units,
                   req.body.DPTID,
                   req.body.Email,
                   req.body.ContactNumber,
                   req.body.Facebook,
                   req.body.CCHID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/update-program', (req, res) => {
    const sql = "UPDATE tbl_program SET ProgramCode = ?, ProgramName = ?, ProgramAbbrev = ?, ProgramDescription = ?, DPTID = ?  WHERE PRGID = ?"
    db.query(sql, [req.body.ProgramCode,
                   req.body.ProgramName,
                   req.body.Abbrev,
                   req.body.Description,
                   req.body.DPTID,
                   req.body.PRGID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/update-room', (req, res) => {
    const sql = "UPDATE tbl_room SET RoomName = ?, Capacity = ?, Type = ?, Building = ?, Floor = ? WHERE RMID = ?"
    db.query(sql, [req.body.RoomName,
                   req.body.Capacity,
                   req.body.Type,
                   req.body.Building,
                   req.body.Floor,
                   req.body.RMID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/update-section', (req, res) => {
    const sql = "UPDATE tbl_section SET SectionName = ?, Population = ?, Year = ?, Semester = ?, PRGID = ? WHERE SCTID = ?"
    db.query(sql, [req.body.SectionName,
                   req.body.Population,
                   req.body.Year,
                   req.body.Semester,
                   req.body.PRGID,
                   req.body.SCTID], (err, data) => {
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

app.post('/delete-coach', (req, res) => {
    const sql = "UPDATE tbl_coach SET Deleted = ? WHERE CCHID = ?"
    db.query(sql, ["True", req.body.CCHID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/delete-program', (req, res) => {
    const sql = "UPDATE tbl_program SET Deleted = ? WHERE PRGID = ?"
    db.query(sql, ["True", req.body.PRGID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/delete-room', (req, res) => {
    const sql = "UPDATE tbl_room SET Deleted = ? WHERE RMID = ?"
    db.query(sql, ["True", req.body.RMID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

app.post('/delete-section', (req, res) => {
    const sql = "UPDATE tbl_section SET Deleted = ? WHERE SCTID = ?"
    db.query(sql, ["True", req.body.SCTID], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})