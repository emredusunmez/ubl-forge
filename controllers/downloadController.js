const path = require("path");
const fs = require("fs");
const archiver = require("archiver");


// Tek XML indir
function downloadXML(req, res) {

    const invoiceId = req.params.id;

    const filePath = path.join(
        __dirname,
        "../outputs",
        `${invoiceId}.xml`
    );

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("XML bulunamadı.");
    }

    res.download(filePath);
}

// Tüm XML'leri ZIP olarak indir
function downloadAll(req, res) {

    const outputDir = path.join(__dirname, "../outputs");

    if (!fs.existsSync(outputDir)) {
        return res.status(404).send("Outputs klasörü bulunamadı.");
    }

    const xmlFiles = fs.readdirSync(outputDir)
        .filter(file => file.endsWith(".xml"));

    if (xmlFiles.length === 0) {
        return res.status(404).send("İndirilecek XML bulunamadı.");
    }

    const now = new Date();
    const pad = (num) => String(num).padStart(2, "0");
    const zipName =
        `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_` +
        `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}_` +
        `UBL_XMLs.zip`;

    res.attachment(zipName);

    const archive = archiver("zip", {
        zlib: { level: 9 }
    });

    archive.on("error", (err) => {
        throw err;
    });

    archive.pipe(res);

    xmlFiles.forEach(file => {

        archive.file(
            path.join(outputDir, file),
            { name: file }
        );

    });

    archive.finalize();
}

module.exports = {

    downloadXML,

    downloadAll

};