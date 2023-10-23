export class Treasure {
    private _count: number;
    private _x: number;
    private _y: number;

    constructor(x: number, y: number, count: number = 0) {
        this._x = x;
        this._y = y;
        if (count >= 0) {
            this._count = count;
        } else {
            throw new Error('Treasure count must be positive or equal to 0');
        }

    }

    getPosition(): {x: number, y: number} {
        return {x: this._x, y: this._y};
    }
    getCount(): number {
        return this._count;
    }

    increaseTreasureCount() {
        this._count++;
    }

    collectTreasure(): 0 | 1 {
        if (this._count > 0) {
            this._count--;
            return 1;
        }
        return 0;
    }

}

