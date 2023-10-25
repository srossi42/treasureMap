import {Cell} from "../src/class/Cell";
import {Treasure} from "../src/class/Treasure";

describe('collectTreasure', () => {

    // Collects treasure when there is treasure to collect
    it('should collect treasure when there is treasure to collect', () => {
        const cell = new Cell();
        const treasure = new Treasure(0, 0, 5);
        cell.setTreasure(treasure);
        cell.collectTreasure();
        expect(cell.getTreasure()?.getCount()).toBe(4);
    });

    // Does not collect treasure when there is no treasure to collect
    it('should not collect treasure when there is no treasure to collect', () => {
        const cell = new Cell();
        cell.collectTreasure();
        expect(cell.getTreasure()).toBeNull();
    });

    // Sets treasure to null when all treasure is collected
    it('should set treasure to null when all treasure is collected', () => {
        const cell = new Cell();
        const treasure = new Treasure(0,0, 1);
        cell.setTreasure(treasure);
        cell.collectTreasure();
        expect(cell.getTreasure()).toBeNull();
    });

    it('should increase the count', () => {
        const treasure = new Treasure(0,0, 1);

        // Increase the count and verify it
        treasure.increaseTreasureCount();
        expect(treasure.getCount()).toBe(2);

        // Increase again
        treasure.increaseTreasureCount();
        expect(treasure.getCount()).toBe(3);
    });

    it('should collect treasure', () => {
        const treasure = new Treasure(0,0, 2);

        // Collect a treasure and verify the count decreases by 1
        const collected = treasure.collectTreasure();
        expect(collected).toBe(1); // Expect 1 because a treasure was collected
        expect(treasure.getCount()).toBe(1);

        // Try to collect when the count is already 0
        const collectedAgain = treasure.collectTreasure();
        expect(collectedAgain).toBe(1); // Expect 1 because this was the last treasure
        expect(treasure.getCount()).toBe(0);


        const collectedOneMoreTime = treasure.collectTreasure();
        expect(collectedOneMoreTime).toBe(0); // Expect 0 because there is no more treasure
        expect(treasure.getCount()).toBe(0);
    });


    it('should throw an error when a negative count is provided', () => {
        expect(() => new Treasure(0,0, -1)).toThrow('Treasure count must be positive or equal to 0');
    });

});
