import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'

const salt = 10;

//define appp
const app = express()
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["POST", "GET", "PUT", "PATCH","DELETE"], // Allow these HTTP methods
    credentials: true // Allow cookies and other credentials
}));

app.use(express.json())

//connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'waste'
})


//Register API
// POST /api/register endpoint
app.post('/api/register', (req, res) => {
    const sql = "INSERT INTO `users`(`email`, `first_name`, `second_name`, `phone`, `password`) VALUES (?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.pass1.toString(), salt, (err, hash) => {
        if (err) {
            return res.json({ Error: 'Failed To Hash Password' });
        }

        const values = [req.body.email, req.body.fname, req.body.lname, req.body.phone, hash];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ Error: 'Failed To Register'});
            } else {
                return res.status(200).json({ status: 200,msg:'Successfully Registered' });
            }
        });
    });
});
//Register API
// POST /api/register endpoint
app.post('/api/schedul', (req, res) => {
    const sql = "INSERT INTO `users`(`email`, `first_name`, `second_name`, `phone`, `password`) VALUES (?, ?, ?, ?, ?)";
        const values = [req.body.email, req.body.fname, req.body.lname, req.body.phone, pass1];

        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(500).json({ Error: 'Failed To Register'});
            } else {
                return res.status(200).json({ status: 200,msg:'Successfully Registered' });
            }
        });
});

//Login API
app.post('/api/login', (req, res) => {
	const sql = 'SELECT * FROM users WHERE email=?';

	db.query(sql, [req.body.email], (err, data) => {
		if (err) {
			return res.status(500).json({ error: "Server Error" });
		} else {
			if (data.length > 0) {
				bcrypt.compare(req.body.pass1.toString(), data[0].password, (err, response) => {
					if (err) {
						return res.status(500).json({ error: 'Password Comparing Failed' });
					}
					if (response) {
						const userInfo = {
							userId:data[0].user_id,
							fname: data[0].first_name,
							lname: data[0].second_name,
							email: data[0].email,
							pass1: data[0].pass1,
							user_role: data[0].user_role,
							phone: data[0].phone
						}
						return res.status(200).json({ status: 200, userData: userInfo});
					} else {
						return res.status(401).json({ error: 'Password Incorrect' });
					}
				});
			} else {
				return res.status(404).json({ error: 'Email Not Found' });
			}
		}
	});
});
//view all users
app.post('/api/view-all', (req, res) => {
	const sql = 'SELECT * FROM users';

	db.query(sql, [req.body.email], (err, data) => {
		if (err) {
			return res.status(500).json({ error: "Server Error" });
		} else {
			if (data.length > 0) {
				const userInfo = {

				}
				return res.status(200).json({ status: 200, allUsers: data});
			} else {
				return res.status(404).json({ error: 'No  Data Found' });
			}
		}
	});
});
//view all users
app.post('/api/count-all', (req, res) => {
	const sql = 'SELECT COUNT(*) as id FROM users';

	db.query(sql, [req.body.email], (err, data) => {
		if (err) {
			return res.status(500).json({ error: "Server Error" });
		} else {
			if (data.length > 0) {
				const userInfo = {

				}
				return res.status(200).json({ status: 200, allUsers: data});
			} else {
				return res.status(404).json({ error: 'No  Data Found' });
			}
		}
	});
});
app.delete('/api/delete/:id', (req, res) => {
	const sql = 'DELETE FROM users WHERE user_id = ?';

	db.query(sql,[req.params.id], (err, result) => {
		if (err) {
			return res.status(500).json({ error: "Server Error" });
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.status(200).json({ status: 200, message: "User deleted successfully" });
	});
});


app.listen(8081, () => {
	console.log("Listening...")
})
