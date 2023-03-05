const express = require("express");
const rolController = require("../../controllers/rolControllers");

const router = express.Router();

router.get("/", rolController.getAllRoles);
router.get("/:rol", rolController.getOneRol);
router.post("/", rolController.createNewRol);
router.patch("/:rolId", rolController.updateOneUsuario);
router.delete("/:rolId", rolController.deleteOneRol);

module.exports = router;