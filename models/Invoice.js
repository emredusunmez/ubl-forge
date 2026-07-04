class Invoice {

    constructor() {

        this.id = "";

        this.uuid = "";

        this.issueDate = "";

        this.currency = "TRY";

        this.customer = null;

        this.supplier = null;

        this.lines = [];

        this.taxTotal = 0;

        this.payableAmount = 0;

    }

}

module.exports = Invoice;