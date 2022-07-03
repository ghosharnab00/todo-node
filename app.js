const express = require('express')
const Router = require("./router")
let port = process.env.PORT;


if (port == null || port == "") {
  port = 3001;
}


const app = express();

//Mongodb codess



app.use(Router);




app.listen(port, ()=>{
    console.log('listening to port ' + port)
})