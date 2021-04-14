const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors")
app.use(cors());
const mongodb = require("mongodb");
const DB = "studentDatabase"
const URL = "mongodb://localhost:27017"

let students = [];

app.post("/student",async function(req,res){
try {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    await db.collection("students").insertOne(req.body);
    await connection.close();
    res.json({
        message:"Stdent record created"
    })
} catch (error) {
    console.log(error)
    
}
});

app.get("/students",async(req,res)=>{
    try {
        let connection=await mongodb.connect(URL);
        let db = connection.db(DB);
        let students = await db.collection("students").find().toArray();
        await connection.close();
        res.json(students)
    } catch (error) {
        console.log(error);
    }
    
});

app.get("/student/:id",async(req,res)=>{
   try {
       let connection = await mongodb.connect(URL)
       let db = connection.db(DB);
       let student = await db.collection("students").findOne({_id:mongodb.ObjectID(req.params.id)});
       await connection.close();
       res.json(student);
       
    
   } catch (error) {
       console.log(error)
   }
});

app.put("/student/:id",async(req,res)=>{
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        let updatedStudent = await db.collection("students").updateOne({_id:mongodb.ObjectID(req.params.id)},{$set : req.body});
        await connection.close();
        res.json(updatedStudent);
    } catch (error) {
        console.log(error)
    }
})

app.delete("/student/:id",async(req,res)=>{
    try {
        let connection = await mongodb.connect(URL)
        let db = connection.db(DB);
        await db.collection("students").deleteOne({_id:mongodb.ObjectID(req.params.id)});
        connection.close();
        res.json({message: "Student deleted"});
    } catch (error) {
        console.log(error)
    }

});

app.listen(3000);