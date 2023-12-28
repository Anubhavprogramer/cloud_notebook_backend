const connecttomongo=require('./db');
const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res)=>{          // home route
//     res.send('radhe radhe')     //sending response to the server
// })

// Here i make saperate routes file for saperate api so that less confussion occures

app.use('/api/auth', require('./routes/auth'))               //authentication route will be created here
app.use('/api/notes', require('./routes/notes'))          //notes route will be created here


app.listen(port,()=>{               //listening to the port that is 3000
    console.log("Now we are online");
})


connecttomongo()

