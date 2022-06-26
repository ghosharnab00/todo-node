const express = require('express')
const bodyParser  = require('body-parser')
const date = require(__dirname + '/date.js')
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const app = express();

let todoList = [];



app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))



app.get('/', (req,res)=>{
    
let day = date.getDate();
    res.render("index", {listTitle:day, todoList:todoList} );

   })

   app.post("/", (req,res)=>{
    let newTodo = req.body.newItem;
    if (newTodo != ""){
    todoList.unshift(newTodo);
}
    res.redirect("/");
   })


app.listen(port, ()=>{
    console.log('listening to port ' + port)
})