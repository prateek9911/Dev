const userRouter = require("../router/userRouter");
const connection = require("./connection");
const userModel = {};
const {v4: uuidv4 } = require("uuid");
const util = require("util");
//query
//create
let create = (userObj) => {
    userObj.uid = uuidv4();
    
    return new Promise(function (resolve, reject) {
        connection.query("INSERT INTO user SET ?", userObj, function(err,res) {
            if(err) {
                reject(err)
                return;
            } else {
                resolve(res);
            }
        })
        
    } )

}

//get
let getById = (uid) => {

    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM user WHERE uid='${uid}';`, uid, function(err,res) {
            if(err){
                reject(err);
                return;
            } else {
                resolve(res[0]);
            }
        })
    })
}

//update
let update =  (uid,  toUpdateObject) => {
    console.log(uid);
    let updateString = '';
    for(let attr in toUpdateObject) {
        updateString += `${attr} = "${toUpdateObject[attr]}", `
    }
    updateString = updateString.substring(0,updateString.length - 2);
    return new Promise(function (resolve, reject) {

        connection.query(`UPDATE user SET ${updateString} WHERE uid = "${uid}"`,function(err,res) {
            if(err){
                reject(err);
                return;
            } else {
                resolve(res);
            }
        })
    })
    return res;
} ;

// delete
let deleteById = async (uid) => {
    return new Promise(function (resolve, reject) {

        connection.query(`DELETE FROM user WHERE uid = "${uid}";`,function(err,res) {
            if(err){
                reject(err);
                return;
            } else {
                resolve(res);
            }
        })
    })
   
} ;
//send request
//receive request

userModel.create = create;
userModel.getById = getById;
userModel.update = update;
userModel.deleteById = deleteById;

module.exports = userModel;