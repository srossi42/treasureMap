import {Adventurer} from "./class/Adventurer";

const readline = require('readline');
const fs = require('fs');


// UTILS FUNCTIONS
import { createInstanceFromLine } from './utils/instanceCreation';
import { checkFormat } from './utils/formatValidator';

// CLASSES
import {CustomMap} from "./class/Map";

// GET FILE PATH
const argv = require('yargs')
    .usage('Usage: $0 -f <file>')
    .option('f', {
        alias: 'file',
        describe: 'Path to the input file',
        demandOption: true,
        type: 'string'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

const filePath: string = argv.f;

if (!filePath) {
    console.log('Please provide a path to the map file.');
    process.exit(1);
}

const fileStream = fs.createReadStream(filePath);
const readLineInterface = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

function processLine(line: string): void {
    const isValidLine: boolean = checkFormat(line);
    if (isValidLine) {
        const instance: CustomMap | Adventurer | null = createInstanceFromLine(line);
        if (instance) {
            if (instance instanceof CustomMap) {
                console.log("It's a map")
                instance.printMap();
            }
            // if(typeof instance === typeof CustomMap) {
            //     const map = new CustomMap(2, 1);
            //     map.printMap();
            //
            // }
            console.log("New instance have been created: ", instance)
        }
    } else {
        console.log(`Invalid Format: ${line}`);
    }
}
function main(): void {

    readLineInterface.on('line', (line: string): void => {
        processLine(line);
    });

    readLineInterface.on('close', () => {
        console.log('File reading is complete.');
    });
}

main()

