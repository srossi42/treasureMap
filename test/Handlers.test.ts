import {CustomMap} from "../src/class/Map";
import {Mountain} from "../src/class/Mountain";
import {handleAdventurer, handleCellInstances, handleMountain, handleTreasure} from "../src/utils/handleFunctions";
import {Treasure} from "../src/class/Treasure";
import {Game} from "../src/class/Game";
import {Adventurer} from "../src/class/Adventurer";
import {Orientation} from "../src/enumsAndConstants/orientation";

describe('handleMountain instance', () => {

    // Cell can be instantiated with Mountain
    it('should instantiate chosen cell with Mountain', () => {
        const map = new CustomMap(10, 5);
        const mountain = new Mountain(1,1);
        handleMountain(mountain, map);
        const cell = map.getCell(1, 1);
        const randomCell = map.getCell(3,2);
        expect(cell.isMountain()).toBe(true);
        expect(randomCell.isMountain()).toBe(false);
    });
});
describe('handleTreasure instance', () => {

    // Cell can be instantiated with Treasure
    it('should instantiate chosen cell with Treasure', () => {
        const map = new CustomMap(10, 5);
        const treasure = new Treasure(1,1, 2);
        handleTreasure(treasure, map);
        const treasureCell = map.getCell(1, 1);
        const randomCell = map.getCell(2, 2);
        expect(treasureCell.isTreasure()).toBe(true);
        expect(randomCell.isTreasure()).toBe(false);
    });
});

describe('handleAdventurer instance', () => {

    // Cell can be instantiated with Treasure or Plain
    it('should instantiate chosen cell with Adventurer', () => {
        const map = new CustomMap(10, 5);
        const game = new Game(map);
        const adventurer = new Adventurer("John Doe", 1, 1, Orientation.N, "AAGD", 0);
        handleAdventurer(game, adventurer, map);
        const cell = map.getCell(1, 1);
        expect(cell.getAdventurer()).toBe(adventurer);
    });
});

describe('handleCell from any instance', () => {

    // Cell can be instantiated with Adventurer
    it('should instantiate chosen cell with Adventurer', () => {
        const map = new CustomMap(10, 5);
        const game = new Game(map);
        const adventurer = new Adventurer("John Doe", 1, 1, Orientation.N, "AAGD", 0);
        handleCellInstances(game, adventurer);
        const cell = game.getMap()?.getCell(1, 1);
        expect(cell?.getAdventurer()).toBe(adventurer);
    });

    // Cell can be instantiated with Treasure
    it('should instantiate chosen cell with Treasure', () => {
        const map = new CustomMap(10, 5);
        const game = new Game(map);
        const treasure = new Treasure(1, 1)
        handleCellInstances(game, treasure);
        const cell = game.getMap()?.getCell(1, 1);
        expect(cell?.isTreasure()).toBe(true);
        expect(cell?.getTreasure()).toBe(treasure);
    });

    // Cell can be instantiated with Mountain
    it('should instantiate chosen cell with Mountain', () => {
        const map = new CustomMap(10, 5);
        const game = new Game(map);
        const mountain = new Mountain(1, 1)
        handleCellInstances(game, mountain);
        const cell = game.getMap()?.getCell(1, 1);
        expect(cell?.isMountain()).toBe(true);
    });
});

