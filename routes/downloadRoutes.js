const express = require("express");
const router = express.Router();

const downloadController = require("../controllers/downloadController");

router.get("/:id", downloadController.downloadXML);

module.exports = router;