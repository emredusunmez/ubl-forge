const { create } = require("xmlbuilder2");

function generate(invoice) {

    const root = create({
        version: "1.0",
        encoding: "UTF-8"
    })
    .ele("Invoice", {

        xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",

        "xmlns:cac":
            "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",

        "xmlns:cbc":
            "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"

    });
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

    return root.end({
        prettyPrint: true
    });

}

module.exports = {
    generate
};