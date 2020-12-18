const express = require("express");
const app = express();
let users = require("./model/user.json");
const fs = require("fs");
 const path = require("path");
//get, post, pathc, delete => express methods
//127.0.0.1:3000 => localhost:3000/home
// get all => admin
// get => particular to a user
// post => create a user
// update => update a user
// delete a user
// nmae, password, handle, image_url, uid(User Id)
//it  always run and it tracks json obj in http body and add it to req.body

app.use(express.json());  // for accepting data in req.body

console.log("I am in app.js");

//checkBody


const userRouter = require("./router/userRouter");
app.use("/api/v1/user", userRouter);





const postRouter = new express.Router();
app.use("/api/v1/post", postRouter);

app.use("*", (req, res) => {
    res.status(404).json({
        "status": "failure",
        "message": "resource not found"
    })
})


/*
//Create
app.post("api/v1/user", createUser);

//get all
app.get("api/v1/user",getAllUser);

//get by uid
app.get("api/v1/user/:uid", getUser);
//update - --
app.patch("api/v1/user/:uid",updateUser);
//delete----
app.delete("api/v1/user/:uid",deleteUser);

*/

/**--------------------------------------------- */
// POST




//if nothing matches our request

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