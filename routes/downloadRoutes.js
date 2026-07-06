const express = require("express");
const router = express.Router();

const downloadController = require("../controllers/downloadController");

router.get("/all", downloadController.downloadAll);

router.get("/:id", downloadController.downloadXML);

module.exports = router;