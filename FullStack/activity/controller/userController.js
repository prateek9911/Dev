const users = require("../model/user.json");
const userModel = require("../model/userModel");
const user_follower_model = require("../model/user_follower_model");

const getAllUser  =  (req,res) => {
    
console.log("We are under userrouter");
    res.status(201).json({
        status:"Success",
        user : users
    })
};


const getUser = async (req,res) => {
    //req parameter -> user id
    
    let cUid  = req.params.uid;
    console.log("Inside getUSer");
    try {
        let findUser = await userModel.getById(cUid);
        res.status(201).json({
        status : "Success",
        user: findUser
    })   
    } catch (err) {
        res.status(201).json({
            status : "Failure",
            user: err.message
        })
    }
};

const createUser =  async (req,res) => {
    let user = req.body;
    console.log(user);
    try {
        let nDBUser = await userModel.create(user);
        res.status(201).json({
            status : "Success",
            user: req.body
        })
    } catch (err) {
        res.status(201).json ({
            status : "error",
            "message" : err.message
        })
    }
};

const updateUser =  async (req, res) => {   
    let cUid = req.params.uid;
    let toBeUpdatedObj = req.body;
    try{
        let result = await userModel.update(cUid,toBeUpdatedObj);
        res.status(200).json({
        status: "Success",
        "message" : result
        })         
    } catch (err) {
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }

};

const deleteUser = (req, res) => {
    let cid = req.params.uid;
    try{
        let deletedUser = userModel.getById(cid);
        let re = userModel.deleteById(cid);
        res.status(200).json( {
            status : "Success",
            result : deletedUser
        })
    
    } catch (err) {
        res.status(500).json({
            status : "failure",
            "message": err.message
        })
    }
    
    
};

const checkBody = (req,res,next) => {
    console.log("I will after expree.json");
    let keysArray = Object.keys(req.body);
    if(keysArray.length <= 0){
        res.status(200).json({
            "status": "failure",
            "message": "Body could not be empty"
        })
    } else {
        next();
    }
}

//---------------------Requestsssss-----------------------

const createRequest = async (req, res) => {
    try {
        console.log("hello");
        let uid = req.body.user_id;
        let addFollower = req.body.follower_id;
        await user_follower_model.addPendingFollower(req.body);
        console.log(await userModel.getById(uid));
        let { is_public } = await userModel.getById(uid);
        console.log(is_public);
        if(is_public == 1) {
            await user_follower_model.acceptRequest(uid,addFollower);
            res.status(201).json( {
                status : "Success",
                "message" : "Request Accepted"
            })
        }
        res.status(201).json( {
            status : "Success",
            "message" : "Request is sent user will accept it"
        })
        

    } catch (err){
        console.log("user controller ka error");
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }
};

// get all followers ---

const getAllFollowers = async (req, res) => {
    try {
        let result = await user_follower_model.getAllFollowers(req.body);
        res.status(201).json({
            status: "Sucess",
            message: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failure",
            message: err.message
        })
    }
}





// Accept the request
const acceptRequest = (req, res) => {
    try {
        let uid = req.body.user_id;
        let follower_id = req.body.follower_id;
        let accept = user_follower_model.acceptRequest(uid,follower_id);
        res.status(201).json( {
            status : "Success",
            result : addFollower
        })
        
    } catch (err) {
        res.status(500).json({
            status: "failure",
            "message": err.message
        })
    }
}


module.exports.checkBody = checkBody;
module.exports.getAllUser = getAllUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;

module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;

