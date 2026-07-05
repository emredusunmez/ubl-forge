const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Supplier = require("../models/Supplier");
const InvoiceLine = require("../models/InvoiceLine");
const crypto = require("crypto");

class InvoiceFactory {

    static create(rows) {

        const firstRow = rows[0];

        const invoice = new Invoice();

        invoice.id = firstRow.InvoiceNo;
        invoice.uuid = crypto.randomUUID();

        invoice.issueDate = firstRow.Date;

        // Customer
        const customer = new Customer();
        customer.name = firstRow.Customer || "";
        customer.vkn = firstRow.CustomerVKN || "";
        customer.city = firstRow.CustomerCity || "";

        invoice.customer = customer;

        // Supplier
        const supplier = new Supplier();
        supplier.name = "Demo Firma";
        supplier.vkn = "1111111111";

        invoice.supplier = supplier;

        let totalWithoutTax = 0;
        let totalTax = 0;

        rows.forEach(row => {

            const line = new InvoiceLine();

            line.name = row.Product || "";

            line.quantity = Number(row.Quantity);

            line.price = Number(row.Price);

            line.taxPercent = Number(row.VAT);

            line.lineTotal = line.quantity * line.price;

            invoice.lines.push(line);

            totalWithoutTax += line.lineTotal;

            totalTax += line.lineTotal * line.taxPercent / 100;

        });
        invoice.lineExtensionAmount = totalWithoutTax;
        
        invoice.taxTotal = totalTax;

        invoice.payableAmount = totalWithoutTax + totalTax;

        return invoice;

    }

}

module.exports = InvoiceFactory;