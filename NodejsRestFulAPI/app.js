var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'usermanage',
  password: '1234',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// API login
app.post('/login', function (req, res){
    const { email, password} = res.req.body
    pool.query('SELECT * FROM USERMANAGE WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            throw error
          }

        if(results.rows.length === 1){
            res.status(200).json({ status: 'success' })
        }else {
            res.status(200).json({ status: 'error', message: 'Email or Password incorrect' })
        }

    })
})

// API get all user
app.get('/getUser', function (req, res){
    pool.query('SELECT * FROM USERMANAGE ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
          }
          res.status(200).json(results.rows)
    })
})

// API add user uncomplete
app.post('/addUser', function (req, res){
    const { name, email, department, job_title, role, password } = res.req.body
    const ID = 2
    console.log(res.req.body);

    pool.query('INSERT INTO USERMANAGE (ID, name, email, department, job_title, role, password) VALUES ($1, $2, $3, $4, $5, $6, $7)', [ID, name, email, department, job_title, role, password], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})

// app.get('/getUser/:id', function (req, res){
//     const id = parseInt(res.req.params.id)
//     console.log(id);
    
//     pool.query('SELECT * FROM USERMANAGE WHERE id = ' + [id], (error, results) => {
//         if (error) {
//           throw error
//         }
//         res.status(200).json(results.rows)
//       })
// })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port);
})