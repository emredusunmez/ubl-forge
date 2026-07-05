function groupRowsByInvoice(rows) {

    const groups = {};

    rows.forEach(row => {

        const invoiceNo = row.InvoiceNo;

        if (!groups[invoiceNo]) {

            groups[invoiceNo] = [];

        }

        groups[invoiceNo].push(row);

    });

    return Object.values(groups);

}

module.exports = {

    groupRowsByInvoice

};