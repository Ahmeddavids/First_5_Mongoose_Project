const express = require("express")
const mongoose = require("mongoose")
const PORT = 2020
const app = express();
app.use(express.json());

const todoListSchema = new mongoose.Schema({
    title: String,
    description: String,
    duedate: String,
    priority: String
});

const list = mongoose.model("TodoList", todoListSchema);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my todoList Page"
    })
});

app.get("/alltasks", async (req, res) => {
    const allTasks = await list.find()
    if(list.length === 0){
        console.log("There are no task to display");
    } else{
        res.status(200).json({
            message: "The total list of task to do is "+ allTasks.length,
            data: allTasks
        }) 
    }
});

app.post("/newtask", async (req, res) => {
    const newTask = await new list(req.body)
    newTask.save()
    res.status(200).json(newTask)    
});

app.get("/onetask/:id", async (req, res) => {
    const id = req.params.id;
    const oneList = await list.findById(id)
    res.status(200).json({
        massage: "This is your task for the day",
        data: oneList
    })
});

app.put("/edittask/:id", async (req, res) => {
    try{
        const id = req.params.id;
    const newTask = req.body;
    const task = await list.findByIdAndUpdate(id, newTask);
    res.status(200).json({
    message: `Your task with Id:${id} has been updated successfully`,
    data: task
    })
    } catch (e){
        res.status(500).json({
            message: "Your task can not be updated"
        })
    }
})

app.delete("/deletetask/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletedTask = await list.findByIdAndDelete(id)
        res.status(200).json({
            message: `The Task with id:${id} was deleted successfully`,
            data: deletedTask
        })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }

})




mongoose.connect("mongodb+srv://ahmeddavids6:MPItZaAClTDXgGUY@cluster0.nu2av5b.mongodb.net/").then(() => {
    console.log("Connection to database is successful");
})


app.listen(PORT, () => {
    console.log(`Server is listening to Port: ${PORT}`);
})