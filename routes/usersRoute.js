const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
