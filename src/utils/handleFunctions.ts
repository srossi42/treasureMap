import {Game} from "../class/Game";
import {CustomMap} from "../class/Map";
import {Adventurer} from "../class/Adventurer";
import {Treasure} from "../class/Treasure";
import {Mountain} from "../class/Mountain";

export function handleCustomMap(game: Game, newInstance: CustomMap): void {
    if (game.hasMap()) {
        throw new Error('Map already exists');
    } else {
        game.setMap(newInstance);
    }
}

export function handleCellInstances(game: Game, newInstance: Adventurer | Treasure | Mountain): void {
    if (game.hasMap()) {
        const map = game.getMap();
        if (map) {
            if (newInstance instanceof Adventurer) {
                handleAdventurer(game, newInstance, map);
            } else if (newInstance instanceof Treasure) {
                handleTreasure(newInstance, map);
            } else if (newInstance instanceof Mountain) {
                handleMountain(newInstance, map);
            }
        }
    } else {
        throw new Error('Map must be created before adding adventurers or treasures');
    }
}

export function handleAdventurer(game: Game, adventurer: Adventurer, map: CustomMap): void {
    try {
        game.addAdventurer(adventurer);
        const { x, y } = adventurer.getPosition();
        const cell = map.getCell(x, y);
        if (cell.isAvailable()) {
            cell.setAdventurer(adventurer);
        } else {
            throw new Error("Cell is not available");
        }
    } catch (e) {
        throw e;
    }
}

export function handleTreasure(treasure: Treasure, map: CustomMap): void {
    try {
        const { x, y } = treasure.getPosition();
        const cell = map.getCell(x, y);
        if (cell.isAvailable()) {
            cell.setTreasure(treasure);
        } else if (cell.isTreasure()) {
            const existingTreasure = cell.getTreasure();
            if (existingTreasure) {
                existingTreasure.increaseTreasureCount();
                cell.setTreasure(existingTreasure);
            }
        } else {
            throw new Error("Cell is not available");
        }
    } catch (e) {
        throw e;
    }
}

export function handleMountain(mountain: Mountain, map: CustomMap): void {
    try {
        const { x, y } = mountain.getPosition();
        const cell = map.getCell(x, y);
        map.addMountain(mountain);
        if (cell.isAvailable()) {
            cell.setMountain();
        } else {
            throw new Error("Cell is not available");
        }
    } catch (e) {
        throw e;
    }
}
