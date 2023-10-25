import {Adventurer} from "./Adventurer";
import {Treasure} from "./Treasure";

export class Cell {
    private _adventurer: Adventurer | null;
    private _treasure: Treasure | null;
    private _isMountain: boolean;
    private _isPlain: boolean;


    constructor(cellContent: Adventurer | Treasure | null = null, isMountain: boolean = false, isPlain: boolean = false) {
        if (cellContent instanceof Adventurer) {
            this._adventurer = cellContent;
            this._treasure = null;
        } else if (cellContent instanceof Treasure) {
            this._adventurer = null;
            this._treasure = cellContent;
        } else {
            this._adventurer = null;
            this._treasure = null;
        }

        if (isMountain) {
            this._isMountain = true;
            this._isPlain = false;
        } else {
            this._isMountain = false;
            this._isPlain = true;
        }
    }

    setMountain() {
        this._isMountain = true;
        this._isPlain = false;
    }

    getTreasure(): Treasure | null {
        return this._treasure;
    }


    getAdventurer(): Adventurer | null {
        return this._adventurer;
    }
    setAdventurer(adventurer: Adventurer | null) {
        this._adventurer = adventurer;
    }

    setTreasure(treasure: Treasure) {
        this._treasure = treasure;
    }


    getDisplayedContent(): string {
        if (this._adventurer) {
            return 'A(' + this._adventurer.getName() + ')';
        } else if (this._treasure) {
            return 'T('+ this._treasure.getCount() + ')';
        } else if (this._isMountain) {
            return 'M';
        } else {
            return '.';
        }
    }
    collectTreasure() {
        let collectedTreasure = 0;
        if (this._treasure) {
            collectedTreasure = this._treasure.collectTreasure();
            const newTreasureCount = this._treasure?.getCount();
            if (newTreasureCount <= 0) {
                this._treasure = null;
            }
        }
        return collectedTreasure;
    }

    isAvailable() {
        return this._isPlain && !this._adventurer;
    }
    isTreasure(): boolean {
        return !!this._treasure;
    }

    isMountain(): boolean {
        return this._isMountain;
    }


}
