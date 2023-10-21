import {CustomMap} from "../class/Map";
import {Adventurer} from "../class/Adventurer";
import {Orientation} from "../enumsAndConstants/orientation";


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

export function createInstanceFromLine(line: string): CustomMap | Adventurer | null {
    if (line.startsWith('#')) {
        // It's a comment line, do nothing
        return null;
    } else {
        if (line.startsWith('C')) {
            const width: number = parseInt(line.split(' - ')[1]);
            const height: number = parseInt(line.split(' - ')[2]);
            return new CustomMap(width, height);
        } else if (line.startsWith('A')) {
            const name: string = line.split(' - ')[1];
            const xPosition: number = parseInt(line.split(' - ')[1]);
            const yPosition: number = parseInt(line.split(' - ')[2]);
            const orientation: Orientation | undefined = getOrientation(line.split(' - ')[3]);
            const movementList: string = line.split(' - ')[4];
            const treasureCount: number = 0;

            return new Adventurer(name, xPosition, yPosition, orientation, movementList, treasureCount);

        }
    }
    return null;
}

