const { v4 } = require("uuid");
const connection = require("./connection");
const {v4: uuidv4} = require("uuid");
const util = require("util");
const { promise } = require("selenium-webdriver");

console.log("user follower model");
const addPendingFollower = (obj) => {
    console.log("add pending");
    return new Promise(function (resolve, reject){

        connection.query("INSERT INTO user_follower SET ?",obj, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getAllFollowers = (uid) => {
    return new Promise(function (resolve, reject) {
        connection.query(`SELECT * FROM user_follower WHERE user_id = "${uid}";`, (err,result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        } )
    })
}

const acceptRequest = (user_id, follower_id) => {
    return new Promise(function (resolve, reject) {
        connection.query(`UPDATE user_follower SET is_accepted = true WHERE user_id = '${user_id}' 
            AND follower_id = '${follower_id}';`, (err,result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        } )
    })
}
module.exports.addPendingFollower = addPendingFollower;
module.exports.getAllFollowers = getAllFollowers;
module.exports.acceptRequest = acceptRequest;