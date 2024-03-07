const express = require("express");
const mysql = require('mysql2')
const cors = require('cors')
const app = express();

// app.use(
//   cors({
//     origin : "http://localhost:5173",
//     methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
//   })
// )
// app.options('*', cors()) 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});




// create db connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'homedb'

})

//connect
db.connect((err)=>{
if(err){
  throw err
}
console.log("mysql connected");
})


 // api route

  app.post('/signup', (req, res)=>{
    let user = {
    customer_fname : req.customer_fname, 
    customer_lname: req.customer_lname,
    customer_email: req.customer_email, 
    password: req.password, 
    phone_number: req.phone_number 
  }
    let sql = ' INSERT INTO customers SET ? ';
    let query = db.query(sql, user, (err, result)=>{
      if(err){
        throw err
      }
      console.log('user created ')
      res.send(result)
    })  
  })

 

  // select users
  app.get('/getusers', (req, res)=>{
    let sql = ' SELECT * FROM customers ';
    let query = db.query(sql, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send(result)
    })  
  })
  // select single user
  app.get('/getuser/:id', (req, res)=>{
    let sql =  `SELECT * FROM customers WHERE customer_id = ${req.params.id} `;
    let query = db.query(sql, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send(result)
    })  
  })
  
  // update user
  app.get('/updateuser/:id', (req, res)=>{
    let newPassword = 'jakom543'
    let sql =  `UPDATE customers SET password = '${newPassword}' WHERE customer_id = ${req.params.id} `;
    let query = db.query(sql, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send(result)
    })  
  })
  
  //delete post
  app.get('/deletepost/:id', (req, res)=>{
    let sql =  `DELETE FROM posts WHERE id = ${req.params.id} `;
    let query = db.query(sql, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send('post deleted... ')
    })  
  })



// test
app.get("/api", (req, res) => {
  console.log("Received /api request...");
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
