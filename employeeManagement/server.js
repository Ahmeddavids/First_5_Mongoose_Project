const express = require("express")
const mongoose = require("mongoose")
const PORT = 2020
const app = express();
app.use(express.json());

const employeeSchema = new mongoose.Schema({
    name: String,
    contactDetails: Number,
    jobTitle: String,
    salary: Number
});

const list = mongoose.model("Employee List", employeeSchema);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my Employee List"
    })
});

app.get("/allemployees", async (req, res) => {
    const allEmployee = await list.find()
    if(list.length === 0){
        console.log("There are no employee to display");
    } else{
        res.status(200).json({
            message: "The total list of employee is "+ allEmployee.length,
            data: allEmployee
        }) 
    }
});

app.post("/newemployee", async (req, res) => {
    const newEmployee = await new list(req.body)
    newEmployee.save()
    res.status(200).json(newEmployee)    
});

app.get("/oneemployee/:id", async (req, res) => {
    const id = req.params.id;
    const oneList = await list.findById(id)
    res.status(200).json({
        massage: "This is the information of the employee",
        data: oneList
    })
});

app.put("/editemployee/:id", async (req, res) => {
    try{
        const id = req.params.id;
    const newEmployee = req.body;
    const Employee = await list.findByIdAndUpdate(id, newEmployee);
    res.status(200).json({
    message: `Your employee with Id:${id} has been updated successfully`,
    data: Employee
    })
    } catch (e){
        res.status(500).json({
            message: "Your employee can not be updated"
        })
    }
})

app.delete("/deleteemployee/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletedEmployee = await list.findByIdAndDelete(id)
        res.status(200).json({
            message: `The employee with id:${id} was deleted successfully`,
            data: deletedEmployee
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
    console.log(`Server is listening to Port:${PORT}`);
})