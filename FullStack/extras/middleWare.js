const express = require("express");
const app = express();
let users = require("./db/user.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
 const path = require("path");
//get, post, pathc, delete => express methods
//127.0.0.1:3000 => localhost:3000/home
// get all => admin
// get => particular to a user
// post => create a user
// update => update a user
// delete a user
// nmae, password, handle, image_url, uid(User Id)

app.use( () => {
    console.log("I will run before expess .json");

})

//it  always run and it tracks json obj in http body and add it to req.body
app.use(express.json());  // for accepting data in req.body

//checkBody

//Create
app.post("/user", (req,res) => {
    let user = req.body;
    user.uid = uuidv4();
    console.log(user);

    users.push(user);
    fs.writeFileSync(path.join(__dirname,"/db/user.json"), JSON.stringify(users));
    res.status(201).json({
        status : "Success",
        user: req.body
    })
})

//get all
app.get("/user", (req,res) => {
    res.status(201).json({
        status:"Success",
        user : users
    })
})
//get by uid
app.get("/user/:uid", (req,res) => {
    //req parameter -> user id
    let cUid  = req.params.uid;
    let userArr = users.filter((user) => {
        return user.uid == cUid;
    });
    console.log(req.params);
    res.status(201).json({
        status : "Success",
        user: userArr.length == 0 ? "No User":userArr[0]
    })
})

//update - --
app.patch("/user/:uid", (req, res) => {
    let cUid = req.params.uid;
    let toBeUpdatedObj = req.body;
    let userArr  =users.filter((user) => {
        return user.uid ==cUid;
    });
    let user  = userArr[0];

    for(let key in toBeUpdatedObj) {
        console.log(key);
        user[key] = toBeUpdatedObj[key];
    }
    
    fs.writeFileSync(path.join(__dirname,"/db/user.json"), JSON.stringify(users));
    
    res.status(200).json({
        status: "Success",
        user: user
    })

})

//delete----
app.delete("/user/:uid", (req, res) => {
    let cid = req.params.uid;

    console.log(users.length);
     users = users.filter( (user) => {return user.uid != cid; });

    fs.writeFileSync(path.join(__dirname, "/db/user.json"),JSON.stringify(users));
    res.status(200).json( {
        status : "Success",
        users,
        length: users.length
    })

    
})

//if nothing matches our request

app.use("*", (req,res) => {
    res.status(404).json({
        "status": "failure",
        "Message": "resource not found"
    })
})

app.listen(3000, () => {
    console.log("Server Started at port 3000");
})

function getUserById(uid){
    let cUid = uid;
    let userArr  =users.filter((user) => {
        return user.uid ==cUid;
    });
    return userArr[0];
}