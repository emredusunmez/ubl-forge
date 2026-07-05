class Invoice {

    constructor() {

        this.id = "";

        this.uuid = "";

        this.issueDate = "";

        this.currency = "TRY";

        // Yeni alanlar
        this.ublVersion = "2.1";

        this.customizationID = "TR1.2";

        this.profileID = "EARSIVFATURA";

        this.invoiceTypeCode = "SATIS";

        this.customer = null;

        this.supplier = null;

        this.lines = [];

        this.taxTotal = 0;

        this.payableAmount = 0;

        this.lineExtensionAmount = 0;
    }

}

module.exports = Invoice;