var jwt = require("jsonwebtoken");   //importing jwt from jsonwebtoken
const JWT_SECRET = "radhe_radhe_**()";  //my hardcore string it should be in .env file, which i will do it soon


// Function to get the user after authentication
const fetchuser = (req, res, next) => {
  // here we will get the user from the jwt token and add id to req object
  const token = req.header("auth-token");   //fetchting token from header file 
  if (!token) {  
    //if token does not exist than we will send this error to the browser that request must be authorised and also sending status code 401
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  // try catch statement to verify the user and if and error occured than catch will be called 
  try {

    // get the data if our current token and pre defined jwt string are same than store the data in data variable  
    const data = jwt.verify(token, JWT_SECRET);
    // adding data.user to req.user 
    req.user = data.user;
    next(); // calling next function where our middleware was called 
  } catch (error) {
    //if any error occure than this will be added 
    res.status(401).send({ error: "please authenticate using a valid primary token" });
  }
};

module.exports = fetchuser;
