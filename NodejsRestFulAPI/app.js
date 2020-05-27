var express = require("express");
const bodyParser = require("body-parser");
var app = express();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "usermanage",
  password: "1234",
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});

// API login
app.post("/login", function (req, res) {
  const { email, password } = res.req.body;
  pool.query(
    "SELECT * FROM USERMANAGE WHERE email = $1 AND password = $2",
    [email, password],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows.length === 1) {
        res.status(200).json(results.rows);
      } else {
        res
          .status(200)
          .json({ status: "error", message: "Email or Password incorrect" });
      }
    }
  );
});

// API get all user
app.get("/getUser", function (req, res) {
  pool.query("SELECT * FROM USERMANAGE ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// API get user for manager
app.post("/getUser/user", function (req, res) {
  const { department } = res.req.body;
  pool.query("SELECT * FROM USERMANAGE WHERE department = $1", [department], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// API add user uncomplete
app.post("/addUser", function (req, res) {
  const { name, email, department, job_title, role, password } = res.req.body;

  pool.query(
    "SELECT * FROM USERMANAGE WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 1) {
        res
          .status(200)
          .json({ status: "error", message: "This email is already used." });
      } else {
        pool.query(
          "INSERT INTO USERMANAGE (ID, name, email, department, job_title, role, password) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)",
          [name, email, department, job_title, role, password],
          (error, result) => {
            if (error) {
              throw error;
            }
            res.status(201).json({ status: "success" });
          }
        );
      }
    }
  );
});

// API edit information of user
app.post("/edit/:id", function (req, res) {
  const id = parseInt(res.req.params.id)
  const { name, email, department, job_title, role, password } = res.req.body;
  pool.query("UPDATE USERMANAGE SET name = $1, email = $2, department = $3, job_title = $4, role = $5, password = $6 WHERE id = $7", [name, email, department, job_title, role, password, id], (error, results) => {
    if (error) {
      throw error;
    }

    if(results.rowCount === 0){
      res.status(201).json({ status: 'error', message: 'ID not found'});
    }else{
      res.status(201).json({ status: 'success'});
    }
    
  })
})

// API delete user
app.delete("/delete/:id", function (req, res) {
  const id = parseInt(res.req.params.id)

  pool.query("DELETE FROM USERMANAGE WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    if(results.rowCount === 0){
      res.status(200).json({ status: 'error', message: 'ID not found'});
    }else {
      res.status(200).json({ status: 'success'});
    }
  })
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application run at http://%s:%s", host, port);
});
