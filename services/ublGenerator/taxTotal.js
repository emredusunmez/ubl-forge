function buildTaxTotal(root, invoice) {

    const taxTotal = root.ele("cac:TaxTotal");

    taxTotal
        .ele("cbc:TaxAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.taxTotal.toFixed(2))
        .up();

    const subtotal = taxTotal
        .ele("cac:TaxSubtotal");

    subtotal
        .ele("cbc:TaxableAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.lines[0].lineTotal.toFixed(2))
        .up();

    subtotal
        .ele("cbc:TaxAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.taxTotal.toFixed(2))
        .up();

    subtotal
        .ele("cbc:Percent")
        .txt(invoice.lines[0].taxPercent)
        .up();

    subtotal
        .ele("cac:TaxCategory")
            .ele("cac:TaxScheme")
                .ele("cbc:Name")
                .txt("KDV")
                .up()
                .ele("cbc:TaxTypeCode")
                .txt("0015")
                .up()
            .up()
        .up();

}

module.exports = buildTaxTotal;