const mapping = require("../mappings/invoiceMapping");

function mapRow(row) {

    const mapped = {};

    for (const key in row) {

        const xmlField = mapping[key];

        if (xmlField) {

            mapped[xmlField] = row[key];

        }

    }

    return mapped;

}

module.exports = {
    mapRow
};