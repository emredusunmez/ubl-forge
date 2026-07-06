const csvService = require("../services/csvService");
const InvoiceFactory = require("../factories/InvoiceFactory");
const ublGenerator = require("../services/ublGenerator");
const invoiceGroupingService = require("../services/invoiceGroupingService");

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

        // InvoiceNo'ya göre grupla
        const groupedInvoices =
            invoiceGroupingService.groupRowsByInvoice(rows);

        // Invoice nesnelerini oluştur
        const invoices = groupedInvoices.map(group =>
            InvoiceFactory.create(group)
        );

        console.log("========== INVOICES ==========");
        console.log(invoices);

        // outputs klasörü oluştur
        const outputDir = path.join(__dirname, "../outputs");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        } 
        else {
        // Eski XML'leri temizle
        fs.readdirSync(outputDir).forEach(file => {

        if (file.endsWith(".xml")) {

            fs.unlinkSync(path.join(outputDir, file));

        }

    });

}

        // Tüm XML'leri üret
        const generatedFiles = [];

        invoices.forEach(invoice => {

            const xml = ublGenerator.generate(invoice);

            const outputPath = path.join(
                outputDir,
                `${invoice.id}.xml`
            );

            fs.writeFileSync(outputPath, xml, "utf8");

            generatedFiles.push({

                id: invoice.id,

                xml: xml,

                fileName: `${invoice.id}.xml`

            });

        });

        console.log("========== GENERATED FILES ==========");
        console.log(generatedFiles.map(f => f.fileName));

        // Önizleme sayfasına gönder
        const now = new Date();

        const summary = {
            totalRows: rows.length,
            totalXml: generatedFiles.length,
            totalFiles: generatedFiles.length,
            uploadTime: now.toLocaleString("tr-TR")
        };

res.render("preview", {
    rows,
    fileName: req.file.originalname,
    generatedFiles,
    summary
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