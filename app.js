const express = require("express")
const mongoose = require('mongoose')
const app = express();
const Todo = require("./models/Todo");

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",async(req,res)=>{
    const allTodo = await Todo.find();

    res.render("index.ejs",{todo: allTodo});
})

app.post("/add/todo",(req,res)=>{
    const {todo} = req.body;
    const newTodo = new Todo({todo});

    newTodo.save()
    .then(()=>{
        console.log("successfully added")
        res.redirect("/")
    })
    .catch((err)=>console.log(err));
})


app.get("/delete/todo/:_id",(req,res)=>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        console.log("successfully deleted")
        res.redirect("/")
    })
    .catch((err)=>console.log(err));
})

app.listen(3000,()=>{
    console.log("server is running")
})