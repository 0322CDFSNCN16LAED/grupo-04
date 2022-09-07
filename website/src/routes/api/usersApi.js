const express = require("express");
const router = express.Router();

const apiControllers = require("../../controllers/api/usersApiControllers");

router.get("/", apiControllers.users);
router.get("/:id", apiControllers.userDetail);

module.exports = router;