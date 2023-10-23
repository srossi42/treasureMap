import {CustomMap} from "../class/Map";
import {Adventurer} from "../class/Adventurer";
import {Orientation} from "../enumsAndConstants/orientation";
import {Mountain} from "../class/Mountain";
import {Treasure} from "../class/Treasure";


function getOrientation(orientationStr: string): Orientation | undefined {
    let orientation: Orientation | undefined = undefined;
    if (orientationStr === 'N') {
        orientation = Orientation.N;
    } else if (orientationStr === 'S') {
        orientation = Orientation.S;
    } else if (orientationStr === 'E') {
        orientation = Orientation.E;
    } else if (orientationStr === 'O') {
        orientation = Orientation.O;
    }
    return orientation;

}

export function createInstanceFromLine(line: string, separator = ' - '): CustomMap | Adventurer | Mountain | Treasure | null {
    if (line.startsWith('#')) {
        // It's a comment line, do nothing
        return null;
    } else {
        if (line.startsWith('C')) {
            const width: number = parseInt(line.split(separator)[1]);
            const height: number = parseInt(line.split(separator)[2]);
            return new CustomMap(width, height);
        } else if (line.startsWith('A')) {
            const name: string = line.split(separator)[1];
            const xPosition: number = parseInt(line.split(separator)[2]);
            const yPosition: number = parseInt(line.split(separator)[3]);
            const orientation: Orientation | undefined = getOrientation(line.split(separator)[4]);
            const movementList: string = line.split(separator)[5];
            const treasureCount: number = 0;

            return new Adventurer(name, xPosition, yPosition, orientation, movementList, treasureCount);

        } else if (line.startsWith('M')) {
            const xPosition: number = parseInt(line.split(separator)[1]);
            const yPosition: number = parseInt(line.split(separator)[2]);
            return new Mountain(xPosition, yPosition);
        }
     else if (line.startsWith('T')) {
        const xPosition: number = parseInt(line.split(separator)[1]);
        const yPosition: number = parseInt(line.split(separator)[2]);
        const count: number = parseInt(line.split(separator)[3]);
        return new Treasure(xPosition, yPosition, count);
    }
    }
    return null;
}

