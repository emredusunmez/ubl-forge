const path = require("path");
const fs = require("fs");

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

module.exports = {
    downloadXML
};