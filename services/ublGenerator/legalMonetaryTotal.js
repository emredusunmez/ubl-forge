function buildLegalMonetaryTotal(root, invoice) {

    const total = root.ele("cac:LegalMonetaryTotal");

    total
        .ele("cbc:LineExtensionAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.lineExtensionAmount.toFixed(2))
        .up();

    total
        .ele("cbc:TaxExclusiveAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.lineExtensionAmount.toFixed(2))
        .up();

    total
        .ele("cbc:TaxInclusiveAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.payableAmount.toFixed(2))
        .up();

    total
        .ele("cbc:PayableAmount", {
            currencyID: invoice.currency
        })
        .txt(invoice.payableAmount.toFixed(2))
        .up();

}

module.exports = buildLegalMonetaryTotal;