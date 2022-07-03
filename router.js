const dotenv = require('dotenv')
let express = require('express')
const _ = require('lodash');
let mongoose = require('mongoose')
const {todoSchema,listSchema} = require('./todomodel')
const bodyParser  = require('body-parser')
const app = express();
dotenv.config();
//let todoList = [];


app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect(process.env.DATABASE_URL,
    {
      useNewUrlParser: true
    })

let Todo = mongoose.model("Todo", todoSchema);
let Lists = mongoose.model("CustomLists", listSchema);

const demotodo = new Todo( {
    content: "this is a demo todo"
})

app.get('/', async(req,res)=>{
    const todoList = await Todo.find({});
        res.render("index", { listName: "Home List",todoList:todoList, listID:"home"} );
    
       })
    
app.post("/", async (req,res)=>{
        let newTodo = req.body.newItem;
        let listNamee = req.body.listName;
        console.log(req.body)
        let todo = new Todo({content: newTodo})

        if (listNamee === "Home List"){
                await todo.save();
            res.redirect("/")
        }
        else{
            Lists.findOne({name:listNamee}, (err, todolist)=>{
                if(!err){
                    todolist.todos.push(todo)
                    todolist.save();
               
                res.redirect(`/${listNamee}`)
                }
                
            

            })}
        
    });

app.post("/delete", (req,res)=>{

    let listID = req.body.listID;
    console.log(req.body.delete)
    if (listID==="home"){
        Todo.findOneAndDelete({_id: req.body.delete},(err,result)=>{
            //console.log(result);
        })
        res.redirect("/");     
    }
    else{
        Lists.findOneAndUpdate({ _id:listID }, {$pull:{ todos: {_id: req.body.delete}}}, (err,foundList)=>{
            if(!err){
                console.log(foundList.todos)
                res.redirect("/"+foundList.name);
            }});
    }

    })
    





app.get('/:listName',(req,res)=>{
    let listName = _.upperFirst(req.params.listName);
    let list = Lists.findOne({name:listName}, (err, todolist)=>{
        //console.log(err);
        if (!todolist){
        let todo = new Lists({name: listName, todos: demotodo})
            todo.save();
            console.log('new todolist added')
            res.redirect(`/${listName}`)
        }
        else{
                //console.log('using existing one', todolist.name , todolist.todos)
                res.render("index", {  listName: todolist.name, todoList: todolist.todos, listID:todolist._id  } );
                //console.log('using existing one', list.name , list.todos)
                
            }      
    })
    
})






       module.exports = app;
    