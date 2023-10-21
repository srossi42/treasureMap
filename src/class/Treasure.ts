export class Treasure {
    private _count: number;

    constructor(count: number = 0) {
        if (count >= 0) {
            this._count = count;
        } else {
            throw new Error('Treasure count must be positive or equal to 0');
        }
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

