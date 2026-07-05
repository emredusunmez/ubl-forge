function buildInvoiceLines(root, lines, currency) {

    lines.forEach((line, index) => {

        const invoiceLine = root
            .ele("cac:InvoiceLine");

        invoiceLine
            .ele("cbc:ID")
            .txt(index + 1)
            .up();

        invoiceLine
            .ele("cbc:InvoicedQuantity", {
                unitCode: "NIU"
            })
            .txt(line.quantity)
            .up();

        invoiceLine
            .ele("cbc:LineExtensionAmount", {
                currencyID: currency
            })
            .txt(line.lineTotal.toFixed(2))
            .up();

        invoiceLine
            .ele("cac:Item")
            .ele("cbc:Name")
            .txt(line.name)
            .up()
            .up();

        invoiceLine
            .ele("cac:Price")
            .ele("cbc:PriceAmount", {
                currencyID: currency
            })
            .txt(line.price.toFixed(2))
            .up()
            .up();

    });

}

module.exports = buildInvoiceLines;