const express = require("express");

const app = express();

const os = require("os");

const fs = require("fs")

app.listen(8080,function(){
    console.log("running")
});

const folderpath ="C:/Users/arun2/Desktop/Recordings";

// fs.writeFile("message.txt",`This is the systemconfiguration:${os.cpus().length} .`,function(err){
// if(err) throw err;
// console.log("File created")
// })

fs.readdir(folderpath,function (err,files) {
    if(err) throw err;
    console.log(files)
    
})

app.get("/",function(req,res){
    fs.readdir(folderpath,function (err,files) {
        if(err) throw err;
        res.send(files)
        
    })
})   