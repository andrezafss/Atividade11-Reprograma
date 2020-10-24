const express = require("express");
const router = express.Router();
const controller = require("../controller/petsController");

router.get("/", controller.getAllPet);
router.get("/:id", controller.getByIdPet);
router.post("/", controller.postPet);
router.delete("/:id", controller.deletePet);
router.put("/:id", controller.putPet);
router.patch("/:id", controller.patchPet);

module.exports = router;