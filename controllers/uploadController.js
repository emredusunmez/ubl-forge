const csvService = require("../services/csvService");
const InvoiceFactory = require("../factories/InvoiceFactory");
const ublGenerator = require("../services/ublGenerator");

const fs = require("fs");
const path = require("path");

async function uploadCSV(req, res) {

    try {

        // CSV oku
        const rows = await csvService.readCSV(req.file.path);

        console.log("========== CSV ==========");
        console.log(rows[0]);
        console.log("rows[0].InvoiceNo =>", rows[0].InvoiceNo);
        console.log('rows[0]["InvoiceNo"] =>', rows[0]["InvoiceNo"]);
        console.log("Object.keys(rows[0]) =>", Object.keys(rows[0]));

        // Invoice nesnelerini oluştur
        const invoices = rows.map(row => InvoiceFactory.create(row));

        console.log("========== INVOICE ==========");
        console.log(invoices[0]);

        // İlk faturanın XML'ini oluştur
        const xml = ublGenerator.generate(invoices[0]);

        // outputs klasörü oluştur
        const outputDir = path.join(__dirname, "../outputs");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // XML'i kaydet
        const outputPath = path.join(
            outputDir,
            `${invoices[0].id || "invoice"}.xml`
        );
        console.log(xml);
        fs.writeFileSync(outputPath, xml, "utf8");

        // Sayfaya gönder
        res.render("preview", {
            rows: rows,
            fileName: req.file.originalname,
            xml: xml
        });

    }
    catch (err) {

        console.error(err);

        res.status(500).send("Hata oluştu.");

    }

}

module.exports = {
    uploadCSV
};