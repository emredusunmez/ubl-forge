function buildSupplier(root, supplier) {

    const supplierParty = root
        .ele("cac:AccountingSupplierParty")
        .ele("cac:Party");

    supplierParty
        .ele("cac:PartyIdentification")
        .ele("cbc:ID", {
            schemeID: "VKN"
        })
        .txt(supplier.vkn)
        .up()
        .up();

    supplierParty
        .ele("cac:PartyName")
        .ele("cbc:Name")
        .txt(supplier.name)
        .up()
        .up();

}

module.exports = buildSupplier;