import {Cell} from "./Cell";
import {Treasure} from "./Treasure";
import {Adventurer} from "./Adventurer";
import {Mountain} from "./Mountain";

export class CustomMap {
    private _width: number;
    private _height: number;
    private _map: Cell[][];
    private _mountainList: Mountain[] = [];

    private _availableOrientationList: string[] = ['N', 'S', 'E', 'O'];
    private _availableActionList: string[] = ['A', 'G', 'D'];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._map = [];
        this.initialize();
    }

    private initialize() {
        for (let i = 0; i < this._height; i++) {
            this._map[i] = [];
            for (let j = 0; j < this._width; j++) {
                this._map[i][j] = new Cell();
            }
        }
    }

    addMountain(mountain: Mountain) {
        this._mountainList.push(mountain);
    }

    getMountainList(): Mountain[] {
        return this._mountainList;
    }

    getTreasureList(): Treasure[] {
        const treasureList: Treasure[] = [];
        this._map.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isTreasure()) {
                    const treasure = cell.getTreasure();
                    if (treasure) {
                        treasureList.push(treasure);
                    }
                }
            });
        });
        return treasureList;
    }
    getWidth(): number {
        return this._width;
    }

    getHeight(): number {
        return this._height;
    }
    getNextPosition(x: number, y: number, orientation: string): { x: number, y: number } | undefined {
        if (!this._availableOrientationList.includes(orientation)) {
            throw new Error('Orientation is not valid');
        } else if (x < 0 || y < 0) {
            throw new Error('Coordinates are not valid');
        }
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


    getCell(x: number, y: number): Cell {
        return this._map[y][x];
    }

    getMap(): { width: number; height: number; map: Cell[][] } {
        return {
            width: this._width,
            height: this._height,
            map: this._map,
        };
    }

    printMap(): void {
        let columnMaxWidth = 0;

        // Calculate the maximum width for each column
        for (const row of this._map) {
            row.forEach((cell) => {
                const content = cell.getDisplayedContent().toString();
                const cellWidth = content.length;
                if (cellWidth > columnMaxWidth) {
                    columnMaxWidth = cellWidth; // Update the maximum width
                }
            });
        }

        // Print the map with aligned columns
        for (const row of this._map) {
            const alignedRow = row.map((cell) => {
                const content = cell.getDisplayedContent().toString();
                const padding = ' '.repeat(columnMaxWidth - content.length);
                return content + padding;
            });
            console.log(alignedRow.join('    '));
        }
    }


}

