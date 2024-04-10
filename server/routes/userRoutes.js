const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const session = require("../config/session");
const router = express.Router();

//JWT verification
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "you are failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

// ********sign up***********
// signup
router.post("/signup", (req, res) => {
  let user = {
    customer_fname: req.body.customer_fname,
    customer_lname: req.body.customer_lname,
    customer_email: req.body.customer_email,
    password: req.body.password,
    phone_number: req.body.phone_number,
  };
  let sql = " INSERT INTO customer SET ? ";
  let query = db.query(sql, user, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("user created ");
    res.send(result);
  });
});

// ********sign in***********
// sign in authorization

router.post("/signin", (req, res) => {
  const customer_email = req.body.customer_email;
  const password = req.body.password;
  let sql =
    " SELECT * FROM customer WHERE customer_email = ? AND password = ?  ";
  let query = db.query(sql, [customer_email, password], (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ id }, "jwtSecret", { expiresIn: 300 });
      req.session.user = result;
      console.log(req.session.user);
      res.status(200).json({ auth: true, token: token, result: result });
      console.log("SUCCESS !! ");
    } else {
      console.log("wrong email/password ");
      res.status(400).json({ auth: false, message: "wrong email/password" });
    }
  });
});

// sign in session
router.get("/signin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/signout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("user has been logged out ");
  } catch (error) {
    throw error;
  }
});

router.delete("/delete/:id", (req, res) => {
  let sql = `DELETE FROM customer WHERE customer_id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("user deleted... ");
  });
});

router.put("/update/:id", (req, res) => {
  try {
    const email = req.body.email || "";
    const contact = parseInt(req.body.contact) || "";
    const password = req.body.password || "";
    const userId = req.params.id;

    let sql = `UPDATE customer SET`;

    if (email !== "") {
      sql += ` customer_email = '${email}',`;
    }

    if (contact !== "") {
      sql += ` phone_number = '${contact}',`;
    }

    if (password !== "") {
      sql += ` password = '${password}',`;
    }

    // Remove trailing comma
    sql = sql.replace(/,$/, "");

    sql += ` WHERE customer_id = ${userId}`;

    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("user updated");
      res.status(200).send(result);
    });
  } catch (error) {
    throw error;
  }
});

// check user authentication
router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated Congrats:");
});
// select users
router.get("/getusers", (req, res) => {
  let sql = " SELECT * FROM customer ";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
