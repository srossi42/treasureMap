export class CustomMap {
    private _width: number;
    private _height: number;
    private _map: string[][];

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
                this._map[i][j] = '.';
            }
        }
    }

    getMap(): { width: number; height: number; map: string[][] } {
        return {
            width: this._width,
            height: this._height,
            map: this._map,
        };
    }

    printMap(): void {
        for (const row of this._map) {
            console.log(row.map(cell => cell === '.' ? '.' : ' ').join('    '));
        }
    }

    placeMountain(x: number, y: number): void {
        this._map[y][x] = 'M';
    }

    placeTreasure(x: number, y: number): void {
        this._map[y][x] = 'T';
    }

    placeAdventurer(x: number, y: number): void {
        this._map[y][x] = 'A';
    }

    cleanPlace(x: number, y: number): void {
        this._map[y][x] = '.';
    }
}

