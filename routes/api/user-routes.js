const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    deleteUserAndThoughts
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    .delete(deleteUserAndThoughts);

router
    .route("/:userId/friends")
    .post(addFriend)

router
    .route("/:userId/friends/:friendId")
    .delete(deleteFriend)

    module.exports = router;