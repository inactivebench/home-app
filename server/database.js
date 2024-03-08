
// testing db with sql statements


// db routes
//create database
app.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE nodemsql';
    db.query(sql, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result);
      res.send('Database created...')
    })
    }) 


    //create table
  app.get('/createposttable', (req, res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))'
      db.query(sql, (err, result)=>{
        if(err){
          throw err
        }
        console.log(result);
        res.send('posts table created...')
      })
  })


  //insert user 
  app.get('/adduser', (req, res)=>{
    let user = {
    customer_fname : " John", 
    customer_lname: "Doe",
    customer_email: "johndoe@mail.com", 
    password: "wanye123", 
    phone_number: "0712345678" 
  }
    let sql = ' INSERT INTO customers SET ? ';
    let query = db.query(sql, user, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send('user created ')
    })  
  })

  //insert user 
  app.get('/adduser', (req, res)=>{
    let user = {
    customer_fname : " Manu", 
    customer_lname: "Chando",
    customer_email: "manchan@mail.com", 
    password: "pesa0T1As", 
    phone_number: "0798647291" 
  }
  
    let sql = ' INSERT INTO customers SET ? ';
    let query = db.query(sql, user, (err, result)=>{
      if(err){
        throw err
      }
      console.log(result)
      res.send('user created ')
    })  
  })