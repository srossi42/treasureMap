import {movementList, Movement} from "../enumsAndConstants/movement";
import {Orientation, orientationMovementList} from "../enumsAndConstants/orientation";

export class Adventurer {
    private _name: string;
    private _xPosition: number;
    private _yPosition: number;
    private _orientation: Orientation;
    private _movementList: string;
    private _treasureCount: number;

    constructor(name: string, xPosition: number = 0, yPosition: number = 0, orientation: Orientation = Orientation.N, movementList: string = "", treasureCount: number = 0) {
        this._name = name;
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._orientation = orientation;
        this._movementList = movementList;
        this._treasureCount = treasureCount;
    }


    // GETTERS
    getName(): string {
        return this._name;
    }

    getTreasureCount(): number {
        return this._treasureCount;
    }

    getPosition(): { x: number, y: number } {
        return {x: this._xPosition, y: this._yPosition};
    }

    getOrientation(): string {
        return this._orientation;
    }

    getMovementList(): string {
        return this._movementList;
    }

    getNextMovementOrPosition() {
        return this._movementList[0];
    }

    // SETTERS
    moveToPosition(xPosition: number, yPosition: number): void {
        this._xPosition = xPosition;
        this._yPosition = yPosition;
    }

    setOrientation(orientation: Orientation): void {
        this._orientation = orientation;
    }

    getNextPosition() {
        const nextMove = this._movementList[0];
        const {x, y} = this.getPosition();
        const orientation = this.getOrientation();
        switch (nextMove) {
            case 'A':
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
            case 'G':
            case 'D':
            default:
                return {x, y};

        }
    }

    getLeftOrientation(): Orientation | undefined {
        const orientation = this.getOrientation();
        switch (orientation) {
            case 'N':
                return Orientation.O;
            case 'S':
                return Orientation.E;
            case 'E':
                return Orientation.N;
            case 'O':
                return Orientation.S;
        }
    }

    getRightOrientation(): Orientation | undefined {
        const orientation = this.getOrientation();
        switch (orientation) {
            case 'N':
                return Orientation.E;
            case 'S':
                return Orientation.O;
            case 'E':
                return Orientation.S;
            case 'O':
                return Orientation.N;
        }
    }

    makeNextMove() {
        const movement = this._movementList[0];
        if (orientationMovementList.includes(movement)) {
            let nextOrientation = null;
            switch (movement) {
                case 'G':
                    nextOrientation = this.getLeftOrientation();
                    break;
                case 'D':
                    nextOrientation = this.getRightOrientation();
                    break;
            }
            if (nextOrientation) {
                this.setOrientation(nextOrientation);
            }
        } else if (movementList.includes(movement)) {
            const {x, y} = this.getNextPosition();
            this.moveToPosition(x, y);
        }
        this._movementList = this._movementList.slice(1);
    }

    // OTHER METHODS

    collectTreasure(): void {
        this._treasureCount++;
    }

    dropTreasure(): void {
        if (this._treasureCount > 0) {
            this._treasureCount--;
        }
    }


}

