import {Adventurer} from "./class/Adventurer";
import {
    writeAdventurerListInfos,
    writeMapInfos,
    writeMountainListInfos, writeOutputFile,
    writeTreasureListInfos
} from "./utils/writeOutput";

const readline = require('readline');
const fs = require('fs');


// UTILS FUNCTIONS
import {createInstanceFromLine} from './utils/instanceCreation';
import {checkFormat} from './utils/formatValidator';

// CLASSES
import {CustomMap} from "./class/Map";
import {Treasure} from "./class/Treasure";
import {Game} from "./class/Game";
import {Mountain} from "./class/Mountain";
import {handleCellInstances, handleCustomMap} from "./utils/handleFunctions";

// GET FILE PATH
const argv = require('yargs')
    .usage('Usage: $0 -f <file>')
    .option('f', {
        alias: 'file',
        describe: 'Path to the input file',
        demandOption: true,
        type: 'string'
    })
    .option('p', {
        alias: 'print',
        describe: 'Display the map in the console',
        demandOption: false,
        type: 'boolean'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

const filePath: string = argv.f;
const printMap: string = argv.p;

if (!filePath) {
    console.log('Please provide a path to the map file.');
    process.exit(1);
}

const fileStream = fs.createReadStream(filePath);
const readLineInterface = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

function processLine(line: string): CustomMap | Adventurer | Treasure | Mountain | null | undefined {
    const isValidLine: boolean = checkFormat(line);
    if (isValidLine) {
        return createInstanceFromLine(line);
    } else {
        throw new Error(`Invalid Format: ${line}`);
    }
}

function processInputLine(line: string, game: Game): void {
    const newInstance = processLine(line);
    if (newInstance) {
        if (newInstance instanceof CustomMap) {
            handleCustomMap(game, newInstance);
        } else {
            handleCellInstances(game, newInstance);
        }
    }
}

function main(): void {
    const game: Game = new Game();
    readLineInterface.on('line', (line: string): void => {
        processInputLine(line, game);
    });

    readLineInterface.on('close', () => {
        console.log('File reading is complete.');
        game.startGame();
        writeOutputFile(game, filePath);
        if (printMap) {
            console.clear();
            console.log("Map :\n")
            game.printMap();
            console.log('\n')
        }
    });
}


main()

