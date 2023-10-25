import {Cell} from "../src/class/Cell";
import {Treasure} from "../src/class/Treasure";
import {Adventurer} from "../src/class/Adventurer";
import {Orientation} from "../src/enumsAndConstants/orientation";

describe('Cell', () => {

    // can be instantiated with default values
    it('should instantiate Cell with default values', () => {
        const cell = new Cell();
        expect(cell.isMountain()).toBeFalsy();
    });

    // can set mountain
    it('should set mountain', () => {
        const cell = new Cell();
        cell.setMountain();
        expect(cell.isMountain()).toBeTruthy();
    });

    // can get treasure
    it('should get treasure', () => {
        const treasure = new Treasure(0, 0, 5);
        const cell = new Cell(treasure);
        expect(cell.getTreasure()).toBe(treasure);
    });

    // can be instantiated with adventurer
    it('should be instantiated with adventurer', () => {
        const adventurer = new Adventurer("John Doe", 0, 0, Orientation.N, "AAGD", 0);
        const cell = new Cell(adventurer);
        expect(cell.getAdventurer()).toBe(adventurer);
    });

    // can be instantiated with treasure
    it('should be instantiated with treasure', () => {
        const treasure = new Treasure(0, 0, 5);
        const cell = new Cell(treasure);
        expect(cell.getTreasure()).toBe(treasure);
    });

});
