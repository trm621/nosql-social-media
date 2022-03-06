const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteUserAndThoughts,
    addFriend,
    deleteFriend,
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
    .route("/:userId/friends/:friendId")
    .put(addFriend)
    .delete(deleteFriend)

    module.exports = router;