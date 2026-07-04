const { create } = require("xmlbuilder2");

function generate(invoice) {

    const xml = create({ version: "1.0" })

        .ele("Invoice")

            .ele("ID")
                .txt(invoice.id)
            .up()

            .ele("IssueDate")
                .txt(invoice.issueDate)
            .up()

            .ele("Customer")

                .ele("Name")
                    .txt(invoice.customer.name)
                .up()

                .ele("VKN")
                    .txt(invoice.customer.vkn)
                .up()

            .up()

            .ele("Supplier")

                .ele("Name")
                    .txt(invoice.supplier.name)
                .up()

            .up()

        .end({
            prettyPrint: true
        });

    return xml;

}

module.exports = {
    generate
};