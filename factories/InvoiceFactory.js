const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Supplier = require("../models/Supplier");
const InvoiceLine = require("../models/InvoiceLine");
const { v4: uuidv4 } = require("uuid");

class InvoiceFactory {

    static create(row) {

        const invoice = new Invoice();

        invoice.id = row.InvoiceNo || "";
        invoice.uuid = uuidv4();
        
        invoice.issueDate =
            row.Date || new Date().toISOString().substring(0, 10);

        // Customer
        const customer = new Customer();

        customer.name = row.Customer || "";
        customer.vkn = row.CustomerVKN || "";

        invoice.customer = customer;

        // Supplier
        const supplier = new Supplier();

        supplier.name = "Demo Firma";
        supplier.vkn = "1111111111";

        invoice.supplier = supplier;

        // Invoice Line
        const line = new InvoiceLine();

        line.name = row.Product || "";
        line.quantity = Number(row.Quantity || 0);
        line.price = Number(row.Price || 0);
        line.taxPercent = Number(row.VAT || 20);

        line.lineTotal = line.quantity * line.price;

        invoice.lines.push(line);

        invoice.taxTotal =
            line.lineTotal * line.taxPercent / 100;

        invoice.payableAmount =
            line.lineTotal + invoice.taxTotal;

        return invoice;

    }

}

module.exports = InvoiceFactory;