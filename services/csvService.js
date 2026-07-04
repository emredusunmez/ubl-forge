const fs = require("fs");
const csv = require("csv-parser");

function readCSV(filePath) {

    return new Promise((resolve, reject) => {

        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {

                const cleanedRow = {};

                for (const key in row) {

                    const cleanKey = key
                        .replace(/^\uFEFF/, "")   // BOM temizle
                        .replace(/\u200B/g, "")   // Zero Width Space temizle
                        .trim();                  // Baştaki/sondaki boşlukları sil

                    cleanedRow[cleanKey] = row[key];

                }

                results.push(cleanedRow);

            })
            .on("end", () => {

                resolve(results);

            })
            .on("error", reject);

    });

}

module.exports = {
    readCSV
};