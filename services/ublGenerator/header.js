function buildHeader(root, invoice) {

    root
        .ele("cbc:UBLVersionID")
        .txt(invoice.ublVersion)
        .up();

    root
        .ele("cbc:CustomizationID")
        .txt(invoice.customizationID)
        .up();

    root
        .ele("cbc:ProfileID")
        .txt(invoice.profileID)
        .up();

    root
        .ele("cbc:ID")
        .txt(invoice.id)
        .up();

    root
        .ele("cbc:UUID")
        .txt(invoice.uuid)
        .up();

    root
        .ele("cbc:IssueDate")
        .txt(invoice.issueDate)
        .up();

    root
        .ele("cbc:InvoiceTypeCode")
        .txt(invoice.invoiceTypeCode)
        .up();

    root
        .ele("cbc:DocumentCurrencyCode")
        .txt(invoice.currency)
        .up();

}

module.exports = buildHeader;