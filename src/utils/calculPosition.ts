import {CustomMap} from "../class/Map";

function getNextPosition(x: number, y: number, orientation: string): { x: number, y: number } | undefined {
    switch (orientation) {
        case 'N':
            return {x, y: y - 1};
        case 'S':
            return {x, y: y + 1};
        case 'E':
            return {x: x + 1, y};
        case 'O':
            return {x: x - 1, y};
    }
}

function isPositionValid(x: number, y: number, map: CustomMap): boolean {
    const mapValues = map.getMap();
    return x >= 0 && x < mapValues.width && y >= 0 && y < mapValues.height;
}

export {getNextPosition, isPositionValid};
