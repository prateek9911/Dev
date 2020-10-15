const express = require("express");
const userRouter = new express.Router();
const {getAllUser, createUser, getUser, updateUser, deleteUser,checkBody, createRequest } = require("../controller/userController");
const { addPendingFollower, getAllFollowers } = require("../controller/userController");
userRouter.route("/").get(getAllUser).post(checkBody,createUser);
userRouter.route("/:uid").get(getUser).patch(checkBody,updateUser).delete(deleteUser);

userRouter.route("/request").post(createRequest).get(getAllFollowers);
console.log("router");

module.exports = userRouter;


