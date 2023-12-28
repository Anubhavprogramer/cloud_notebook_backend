const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "radhe_radhe_**()";

// creating a user using: POST "api/auth/createUser", Dosen't require login , it is signup
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //creating a  normal user
    // const user = User(req.body);
    // user.save();
    // console.log(req.body)

    // creating a user using express validator
    const errors = validationResult(req);
    //if there are erors than send bad request otherwise create the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the eamil exits already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exits" });
      }

      // secureing the password
      const salt = await bcrypt.genSalt(10); // salt creation
      secPass = await bcrypt.hash(req.body.password, salt); //hast creation and giving to the server like a secured password

      //creating user for databse
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, //Adding secured password
      });

      //sending is user is created with out any problem
      // res.json({"nice":"User created"})

      // creating a token and than send it as a respose to the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const awthtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData)
      res.send({ awthtoken });

      //  .then(user => {res.json(user),console.log(user)}) //if user gets created than add it to the database
      //  .catch(err=> {console.log(err), res.json({error:"Please enter the unique value",message:err.message})}) //if error occured than console.log the error
    } catch (error) {
      //sending the error is any problem occured
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER OCCURED");
    }
  }
),
  //route to make login using email and password at api/auth/login,
  router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank").isLength({ min: 5 }).exists()
        ],
    async (req, res) => {
    //   console.log("radhe radhe");
      const errors = validationResult(req);
      //if there are erors than send bad request otherwise create the error
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return res
            .status(400)
            .json({ error: "Plese try to login via correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ error: "Plese try to login via correct credentials" });
        }
        // else{
        //     console.log("radhe radhe")
        // }

        const data = {
          user: {
            id: user.id,
          },
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);
        res.json({ authtoken });
      } catch (error) {
        //sending the error is any problem occured
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );
module.exports = router;
