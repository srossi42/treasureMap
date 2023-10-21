import {Cell} from "./Cell";
import {Treasure} from "./Treasure";
import {Adventurer} from "./Adventurer";

export class CustomMap {
    private _width: number;
    private _height: number;
    private _map: Cell[][];

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

    isPositionValid(x: number, y: number): boolean {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }


    isPositionAvailable(x: number, y: number): boolean {
        const cell = this._map[y][x];
        return this.isPositionValid(x, y) && cell.isPlain() && !cell.isOccupied();

    }
    getMap(): { width: number; height: number; map: Cell[][] } {
        return {
            width: this._width,
            height: this._height,
            map: this._map,
        };
    }

    printMap(): void {
        for (const row of this._map) {
            console.log(row.map(cell => cell.getDisplayedContent()).join('    '));
        }
    }

    setMountain(x: number, y: number): void {
        this._map[y][x] = new Cell(null, true);
    }

    setTreasure(x: number, y: number): void {
        const cell = this._map[y][x];
        const treasure = cell.getTreasure();
        if (treasure) {
            treasure.increaseTreasureCount();
            this._map[y][x].setTreasure(treasure);
        } else {
            this._map[y][x].setTreasure(new Treasure());
        }
    }


    setAdventurer(x: number, y: number, adventurer: Adventurer): void {
        this._map[y][x] = new Cell(adventurer, false, false);
    }

    resetCell(x: number, y: number): void {
        this._map[y][x] = new Cell();
    }

}

