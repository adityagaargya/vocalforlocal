const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mongoose = require("mongoose");
const ejs = require("ejs");

var _ = require('lodash');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


// Connect to MongoDB 
mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));

app.set('view engine', 'ejs');


const dataSchema = new mongoose.Schema({
    countryCode: Number,
    name: String,
    description: String
});


const Company= mongoose.model("Company", dataSchema);

const shopSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    shopName: String,
    shopDescription: String,
    shopLocation : String,
    shopPinCode : Number,
    userEmail : String,
    userPassword : String

});

const Shop = mongoose.model("Shop", shopSchema);

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

app.get("/about", (req, res)=> {
    res.render("about");
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/shops", (req, res)=> {
    res.render("shops");
});


app.post("/shops", (req, res)=> {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const sName = req.body.shopName;
    const sNameLower = sName.toLowerCase();
    const sDescription = req.body.shopDescription
    const locName = req.body.locationName;
    const pinCode = req.body.pinCode;
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    console.log(sName, sDescription, email, password);


    const shop = new Shop({
        firstName : fName,
        lastName : lName,
        shopName: sNameLower,
        shopDescription: sDescription,
        shopLocation : locName,
        shopPinCode : pinCode,
        userEmail : email,
        userPassword : password

    });



    shop.save();

    res.render("success");
    
});

app.get("/search", (req, res)=> {
    res.render("search");
});

app.post("/search", (req, res)=> {
    const search = req.body.shopName;
    const searchLower = search.toLowerCase();
    console.log(searchLower);
    Shop.findOne({shopName: searchLower}, function(err, foundItem) {
        if(!foundItem) {
            res.render("notfoundshop");
        }
        else {
            res.render("searchresult", {shopName: search, fName : foundItem.firstName, shopDescription : foundItem.shopDescription, email : foundItem.userEmail, shopLocation : foundItem.shopLocation })
        }
    })
    
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, ()=> {
    console.log("Server is up and running");
    
})