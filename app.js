const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mongoose = require("mongoose");
const ejs = require("ejs");
const port = 3000;
var _ = require('lodash');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-aditya:vi19bh20@cluster0.szyl8.mongodb.net/miniprojectDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));

app.set('view engine', 'ejs');


const dataSchema = new mongoose.Schema({
    countryCode: Number,
    name: String,
    description: String
});

const Company= mongoose.model("Company", dataSchema);

// const company1 = new Company({
//     name: "Apple",
//     description: "Good Company"
// });

// const company2 = new Company({
//     name: "Amazon",
//     description: "bad Company"
// });

// const company3 = new Company({
//     name: "google",
//     description: "awesome Company"
// });


// const companies = [company1, company2, company3];

// Company.insertMany(companies, function(err) {
//     if(err) {
//         console.log(err);
        
//     } else {
//         console.log("Inserted");
        
//     }
// })

app.get("/", (req, res)=> {
    res.render("home");
})

app.post("/", (req, res)=> {
    const search = req.body.brand;
    const searchLower = search.toLowerCase();

    console.log(search);
    Company.findOne({name: searchLower}, function(err, foundItem) {
        if(!foundItem) {
            res.render("notfound");
            
        }
        else{
            if(foundItem.countryCode === 1){
                console.log(foundItem.name);
                res.render("indian", {companyName: foundItem.name, companyContent: foundItem.description});
                
            }
            else {
                res.render("chinese", {companyName: foundItem.name, companyContent: foundItem.description});
            
                
            }
            
            
        }
    })
    
})


// app.get("/posts/:postName", (req, res) => {
//     var requestedTitle = _.lowerCase(req.params.postName);
//     posts.forEach(function(post) {
//         const storedTitle = _.lowerCase(post.title);
//         if (requestedTitle === storedTitle) {
//             console.log("Match");
//             res.render("post", {title : post.title, content: post.post})
            
//         } else{
//             console.log("Not a match");
            
//         }
//     })
    
// });

app.listen(port, ()=> {
    console.log("Server is up and running");
    
})