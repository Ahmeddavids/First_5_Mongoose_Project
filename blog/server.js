const express = require("express")
const mongoose = require("mongoose")
const PORT = 2020
const app = express();
app.use(express.json());

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: String
}, {timestamps: true});

const bloglist = mongoose.model("blog", blogSchema);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my blog Page"
    })
});

app.get("/allblog", async (req, res) => {
    const allblog = await bloglist.find()
    if(bloglist.length === 0){
        console.log("There are no blog list to display");
    } else{
        res.status(200).json({
            message: "The total number of blog list is "+ allblog.length,
            data: allblog
        }) 
    }
});

app.post("/newblog", async (req, res) => {
    const newblog = await new bloglist(req.body)
    newblog.save()
    res.status(200).json(newblog)    
});

app.get("/oneblog/:id", async (req, res) => {
    const id = req.params.id;
    const oneList = await bloglist.findById(id)
    res.status(200).json({
        massage: "This is current blog you're viewing.",
        data: oneList
    })
});

app.put("/editblog/:id", async (req, res) => {
    try{
        const id = req.params.id;
    const newblog = req.body;
    const blog = await bloglist.findByIdAndUpdate(id, newblog);
    res.status(200).json({
    message: `Your blog with Id:${id} has been updated successfully`,
    data: blog
    })
    } catch (e){
        res.status(500).json({
            message: "Your blog can not be updated"
        })
    }
})

app.delete("/deleteblog/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletedblog = await bloglist.findByIdAndDelete(id)
        res.status(200).json({
            message: `The blog with id:${id} was deleted successfully`,
            data: deletedblog
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