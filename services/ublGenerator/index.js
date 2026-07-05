const { create } = require("xmlbuilder2");

const buildHeader = require("./header");
const buildSupplier = require("./supplier");
const buildCustomer = require("./customer");
const buildInvoiceLines = require("./invoiceLine");

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

    buildHeader(root, invoice);

    buildSupplier(root, invoice.supplier);

    buildCustomer(root, invoice.customer);

    buildInvoiceLines(root, invoice.lines, invoice.currency);

    return root.end({
        prettyPrint: true
    });

}

module.exports = {
    generate
};