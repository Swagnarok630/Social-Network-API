
const router = require('express').Router();
// const {User} = require("../../models") moved to controller
const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
//TODO - ROUTE THAT CREATES A NEW USER
router.route("/")
    .get(getUsers)
    .post(createUser)

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
//TODO - ROUTE THAT UPDATES A SINGLE USER
//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser)

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
