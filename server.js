const path = require('path'); 
const express = require('express'); 
const db = require('./config/db'); 
const User = require('./models/Patient');
const app = express(); 

const mappingGender = {
    'Male': 1, 
    'Female': 2, 
    'Other': 3, 
}


app.use(express.urlencoded({
    extended: true
})); 
app.use("/assets", express.static("assets"));

app.post('/appointment', async (req, res)=>{
    try {
        const {name, age, bloodGroup, gender, disease, mobileNumber} = req.body; 
        console.log(mappingGender[gender]);
        if(!mappingGender[gender]) return res.send("Please choose one gender."); 
        await User.create({
            name, 
            age, 
            bloodGroup, 
            gender: mappingGender[gender], 
            existingDisease: disease, 
            mobileNumber
        })
        res.send("Your Appointment got booked successfully."); 
    }catch(err){
        console.log(err);
        res.send("Error while booking appointment"); 
    }
})
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html')); 
})


const PORT = 3000; 


app.listen(PORT, () => {
    db.sync({
        alter: true
    })
    console.log("Server started on port: ", PORT); 
}) 