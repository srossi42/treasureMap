import fs from 'fs';
import path from 'path';
import {Writable} from 'stream';

// CLASSES IMPORTS
import {CustomMap} from "../class/Map";
import {Mountain} from "../class/Mountain";
import {Treasure} from "../class/Treasure";
import {Adventurer} from "../class/Adventurer";
import {Game} from "../class/Game";

// CONSTANTS IMPORTS
import {OUTPUT_PATH} from "../enumsAndConstants/paths";

export function writeOutputFile(game: Game, inputFilePath: string): void {
    const rootDirectory = path.resolve(__dirname, '../..');
    const outputFileName = path.basename(inputFilePath).replace('.txt', '_output.txt');
    const outputFilePath = path.join(rootDirectory, OUTPUT_PATH, outputFileName);
    const writeStream = fs.createWriteStream(outputFilePath);
    const map = game.getMap();

    if (map) {
        writeMapInfos(writeStream, map);
        writeMountainListInfos(writeStream, map.getMountainList());
        writeTreasureListInfos(writeStream, map.getTreasureList());
    }
    writeAdventurerListInfos(writeStream, game.getAdventurerList());

    console.log("Output file written successfully");
}

export function writeMapInfos(writeStream: Writable, map: CustomMap) {
    writeStream.write('C - '
        + map?.getWidth() + ' - '
        + map?.getHeight() + '\n');
}

export function writeMountainListInfos(writeStream: Writable, mountainList: Mountain[]) {
    mountainList.forEach((mountain) => {
        writeStream.write('M - '
            + mountain.getPosition().x + ' - '
            + mountain.getPosition().y + '\n');
    });
}

export function writeTreasureListInfos(writeStream: Writable, treasureList: Treasure[]) {
    treasureList.forEach((treasure) => {
        const treasureCount = treasure.getCount();
        if (treasureCount) {
            writeStream.write('T - '
                + treasure.getPosition().x + ' - '
                + treasure.getPosition().y + ' - '
                + treasureCount + '\n');
        }
    });
}

export function writeAdventurerListInfos(writeStream: Writable, adventurerList: Adventurer[]) {
    adventurerList.forEach((adventurer) => {
        writeStream.write('A - '
            + adventurer.getName() + ' - '
            + adventurer.getPosition().x + ' - '
            + adventurer.getPosition().y + ' - '
            + adventurer.getOrientation() + ' - '
            + adventurer.getTreasureCount() + '\n');
    });
}
