const csv = require('fast-csv');

const saveToCSV = async (filepath, data, headers = false) => {

    return new Promise((resolve, reject) => {
        csv
            .writeToPath(filepath, data, { headers: headers })
            .on('error', (error) => {
                console.log(error);
                reject();
            })
            .on('finish', () => resolve(filepath));
    });

};

const readFromCSV = async (filepath, headers = false) => {
    return new Promise((resolve, reject) => {
        let records = [];

        csv
            .parseFile(filepath, { headers: headers })
            .on('error', (error) => {
                console.log(error);
                reject();
            })
            .on('data', (row) => {
                records.push(row);
            })
            .on('end', (rowCount) => {
                console.log(`${rowCount} record(s) read`)
                resolve(records);
            });
    });
}

module.exports = {
    saveToCSV,
    readFromCSV
}