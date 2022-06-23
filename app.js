const express = require('express')
const bodyParser  = require('body-parser')
const port = process.env.PORT || 3000;
const app = express();

let todoList = [];



app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req,res)=>{
res.render((__dirname+"/views/index.ejs") );
})

app.get('/try', (req,res)=>{
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options)

    res.render("try", {days:day, todoList:todoList} );

   })

   app.post("/try", (req,res)=>{
    let newTodo = req.body.newItem;
    todoList.unshift(newTodo);
    res.redirect("try");
   })


app.listen(port, ()=>{
    console.log('listening to port ' + port)
})