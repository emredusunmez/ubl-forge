function buildCustomer(root, customer) {

    const customerParty = root
        .ele("cac:AccountingCustomerParty")
        .ele("cac:Party");

    customerParty
        .ele("cac:PartyIdentification")
        .ele("cbc:ID", {
            schemeID: "VKN"
        })
        .txt(customer.vkn)
        .up()
        .up();

    customerParty
        .ele("cac:PartyName")
        .ele("cbc:Name")
        .txt(customer.name)
        .up()
        .up();

}

module.exports = buildCustomer;