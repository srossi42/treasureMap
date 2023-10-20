import {getNextPosition} from '../utils/calculPosition';

export class Adventurer {
    private _name: string;
    private _xPosition: number;
    private _yPosition: number;
    private _orientation: string;
    private _movementList: string;
    private _treasureCount: number;

    constructor(name: string, xPosition: number, yPosition: number, orientation: string, movementList: string, treasureCount: number) {
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

    getTreasueCount(): number {
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
    setPosition(xPosition: number, yPosition: number): void {
        this._xPosition = xPosition;
        this._yPosition = yPosition;
    }

    moveToPosition(xPosition: number, yPosition: number): void {
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._movementList = this._movementList.slice(1);
    }

    setOrientation(orientation: string): void {
        this._orientation = orientation;
    }

    // OTHER METHODS

    addTreasure(): void {
        this._treasureCount++;
    }

    withdrawTreasure(): void {
        if (this._treasureCount > 0) {
            this._treasureCount--;
        }
    }

    moveToNextPosition(nextMovementIsPossible: boolean): void {
        if (nextMovementIsPossible) {
            const nextMovement = this._movementList[0];
            if (nextMovement === 'A') {
                const nextPosition: {
                    x: number,
                    y: number
                } | undefined = getNextPosition(this._xPosition, this._yPosition, this._orientation);
                if (nextPosition === undefined) {
                    throw new Error('Error while moving to next position');
                } else if (nextPosition.x && nextPosition.y) {
                    this._xPosition = nextPosition.x;
                    this._yPosition = nextPosition.y;
                }

            } else {
                this._orientation = nextMovement;
            }
        }
        this._movementList = this._movementList.slice(1);
    }


}

