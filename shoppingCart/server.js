const express = require("express")
const mongoose = require("mongoose")
const PORT = 2020
const app = express();
app.use(express.json());

const shoppingCartSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: Number,
    availability: Number
});

const item = mongoose.model("Shopping Cart", shoppingCartSchema);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my shopping Cart"
    })
});

app.get("/allitems", async (req, res) => {
    const allItems = await item.find()
    if(item.length === 0){
        console.log("There are no item to display");
    } else{
        res.status(200).json({
            message: "The total item in your cart is: "+ allItems.length,
            data: allItems
        }) 
    }
});

app.post("/newitem", async (req, res) => {
    const newitem = await new item(req.body)
    newitem.save()
    res.status(200).json(newitem)    
});

app.get("/oneitem/:id", async (req, res) => {
    const id = req.params.id;
    const oneitem = await item.findById(id)
    res.status(200).json({
        massage: "This is the selected item",
        data: oneitem
    })
});

app.put("/edititem/:id", async (req, res) => {
    try{
        const id = req.params.id;
    const newitem = req.body;
    const item = await item.findByIdAndUpdate(id, newitem);
    res.status(200).json({
    message: `Your item with Id:${id} has been updated successfully`,
    data: item
    })
    } catch (e){
        res.status(500).json({
            message: "Your item can not be updated"
        })
    }
})

app.delete("/deleteitem/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deleteditem = await item.findByIdAndDelete(id)
        res.status(200).json({
            message: `The item with id:${id} was deleted successfully`,
            data: deleteditem
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