const csvService = require("../services/csvService");
const InvoiceFactory = require("../factories/InvoiceFactory");
const ublGenerator = require("../services/ublGeneratorService");

async function uploadCSV(req, res) {

    try {

        const rows = await csvService.readCSV(req.file.path);
        const invoices = rows.map(row => InvoiceFactory.create(row));
        const xml = ublGenerator.generate(invoices[0]);

        console.log(xml);

        console.log(invoices);
        res.render("preview", {

            rows: rows,

            fileName: req.file.originalname

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send("Hata oluştu.");

    }

}

module.exports = {

    uploadCSV

};