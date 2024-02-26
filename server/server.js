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
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", Name: req.Name});
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM tbl_user WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        if (data.length > 0) {
            const FirstName = data[0].FirstName;
            const LastName = data[0].LastName;
            const Name = FirstName.concat(" ", LastName);
            const token = jwt.sign({Name}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
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
app.post('/home', (req, res) => {
    const sql = "INSERT INTO tbl_user (`UserID`, `FirstName`, `LastName`, `Email`, `Password`) VALUES (?)"
    const values = [
        req.body.UserID,
        req.body.FirstName,
        req.body.LastName,
        req.body.Email,
        req.body.Password,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

// READ: extracting data from the database
// Section
app.get('/section', (req, res) => {
    const sql = "SELECT * FROM tbl_section WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Student
app.get('/student', (req, res) => {
    const sql = "SELECT * FROM tbl_student WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// StudentSection
app.get('/studentsection', (req, res) => {
    const sql = "SELECT tbl_student.StudentID, jnc_studentsection.SectionID, tbl_student.FirstName, tbl_student.LastName FROM tbl_student INNER JOIN jnc_studentsection ON tbl_student.StudentID = jnc_studentsection.StudentID";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Course
app.get('/course', (req, res) => {
    const sql = "SELECT * FROM tbl_course WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// Faculty Member
app.get('/facultymember', (req, res) => {
    const sql = "SELECT * FROM tbl_facultymember WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// School Facility
app.get('/schoolfacility', (req, res) => {
    const sql = "SELECT * FROM tbl_schoolfacility WHERE Status='Active'";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
// User: Counter
app.get('/home', (req, res) => {
    const sql = "SELECT COUNT(*) + 1 as count FROM tbl_user";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})
