const inquirer = require('inquirer');
const { saveToCSV, readFromCSV } = require('./csvUtility');

const questions =
    [{
        type: 'list',
        name: 'activity',
        message: 'What do you want to do?',
        choices: [
            'Read CSV file',
            'Save to CSV file'
        ]
    },
    {
        type: 'input',
        name: 'filepath',
        message: 'Please enter the file path'
    }, {
        type: 'input',
        name: 'row_count',
        message: 'How many rows of data are there?'
    }, {
        type: 'input',
        name: 'headers',
        message: 'Please enter the name of the columns (delimited by comma)'
    }, {
        type: 'input',
        name: 'data',
        message: 'Please enter the data (delimited by comma)'
    }];

let main = async () => {
    let answer_1 = await ask(questions[0]);
    let answer_2 = await ask(questions[1]);

    if (answer_1.activity === questions[0].choices[0]) {

        let records = await readFromCSV(answer_2.filepath, true)
        console.log(`Results:`);
        console.log(records);

    } else if (answer_1.activity === questions[0].choices[1]) {

        let records = [];

        let answer_3 = await ask(questions[2]);
        let answer_4 = await ask(questions[3])
        records.push(answer_4.headers.split(','));

        for (let i = 0; i < answer_3.row_count; i++) {
            let data = await ask(questions[4]);
            records.push(data.data.split(','))
        }

        let path = await saveToCSV(answer_2.filepath, records, true);
        console.log(`${path} created successfully`);

    }

    console.log(`== End ==`)
}

let ask = async (question) => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(question)
            .then(answer => {
                resolve(answer);
            });
    });
}

main();

