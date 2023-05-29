const express = require("express")
const mongoose = require("mongoose")
const PORT = 2020
const app = express();
app.use(express.json());

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number
});

const contactlist = mongoose.model("Contact List", contactSchema);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my contact list"
    })
});

app.get("/contacts", async (req, res) => {
    const contacts = await contactlist.find()
    if(contactlist.length === 0){
        console.log("There are no contact to display");
    } else{
        res.status(200).json({
            message: "The total number of contact is: "+ contacts.length,
            data: contacts
        }) 
    }
});

app.post("/newcontact", async (req, res) => {
    const newContact = await new contactlist(req.body)
    newContact.save()
    res.status(200).json(newContact)    
});

app.get("/onecontact/:id", async (req, res) => {
    const id = req.params.id;
    const oneContact = await contactlist.findById(id)
    res.status(200).json({
        massage: "This is the contact information",
        data: oneContact
    })
});

app.put("/editcontact/:id", async (req, res) => {
    try{
        const id = req.params.id;
    const newContact = req.body;
    const contact = await contactlist.findByIdAndUpdate(id, newContact);
    res.status(200).json({
    message: `Your contact with Id:${id} has been updated successfully`,
    data: contact
    })
    } catch (e){
        res.status(500).json({
            message: "Your contact List can not be updated"
        })
    }
})

app.delete("/deletecontact/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const deletedContact = await list.findByIdAndDelete(id)
        res.status(200).json({
            message: `The contact with id:${id} was deleted successfully`,
            data: deletedContact
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