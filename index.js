const connecttomongo=require('./db');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{          // home route
    res.send('radhe radhe')     //sending response to the server
})

app.listen(port,()=>{               //listening to the port that is 3000
    console.log("Now we are online");
})


connecttomongo()

