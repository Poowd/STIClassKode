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
    database: "classkode"
})

// All About Accounts
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "We need Token."});
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
    const sql = "SELECT * FROM user WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        if (data.length > 0) {
            const Name = data[0].Name;
            const token = jwt.sign({Name}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Message: "No Records Found"})
        }
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.listen(8081, () => {
    console.log("Running")
})

/* 

    This section pertains to CRUD Operations:
        1. CREATE
        2. READ
        3. UPDATE
        4. DELETE

*/

// READ

// Academic Year
app.get('/academicyear', (req, res) => {
    const sql = "SELECT * FROM academic_year";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})

// Section
app.get('/section', (req, res) => {
    const sql = "SELECT * FROM section";
    db.query(sql, (err, data) => {
        if (err) return res.json({Message: "Server Sided Error"});
        return res.json(data)
    })
})