const csvService = require("../services/csvService");

async function uploadCSV(req, res) {

    try {

        const rows = await csvService.readCSV(req.file.path);

        console.log(rows);

        res.json(rows);

    } catch (err) {

        console.log(err);

        res.status(500).send("CSV okunamadı.");

    }

}

module.exports = {
    uploadCSV
};