import {Adventurer} from "./Adventurer";
import {CustomMap} from "./Map";
import {orientationMovementList} from "../enumsAndConstants/orientation";

export class Game {
    private _adventurerList: Adventurer [];
    private map: CustomMap | null;


    constructor(map?: CustomMap, adventurerList: Adventurer[] = []) {
        this._adventurerList = adventurerList;
        this.map = map ? map : null;
    }

    addAdventurer(adventurer: Adventurer) {
        if (this._adventurerList.findIndex((adv) => adv.getName() === adventurer.getName()) !== -1) {
            throw new Error('Adventurer already exists');
        } else {
            this._adventurerList.push(adventurer);
        }
    }

    getAdventurerList(): Adventurer[] {
        return this._adventurerList;
    }

    hasMap(): boolean {
        return this.map !== null;
    }

    getMap() {
        return this.map;
    }

    printMap() {
        if (this.map) {
            this.map.printMap();
        }
    }
    setMap(map: CustomMap) {
        this.map = map;
    }

    startGame() {
        let anyAdventurerHasMoves = true;
        while (anyAdventurerHasMoves) {
            anyAdventurerHasMoves = false;
            this._adventurerList.forEach((adventurer) => {
                if (adventurer.hasMovesRemaining()) {
                    anyAdventurerHasMoves = true;
                    const {x: currentPositionX, y: currentPositionY} = adventurer.getPosition();
                    const {x: nextPositionX, y: nextPositionY} = adventurer.getNextPosition();
                    if (this.map) {
                        const currentCell = this.map.getCell(currentPositionX, currentPositionY);
                        const nextCell = this.map.getCell(nextPositionX, nextPositionY);
                        const nextMoveIsOrientation = orientationMovementList.includes(adventurer.getNextMovementOrPosition());
                        if (currentCell !== nextCell || nextMoveIsOrientation) {
                            if (nextMoveIsOrientation) { // Adventurer is turning left or right but will not move to another cell and will not collect treasure.
                                adventurer.play(true);
                            } else if (nextCell.isAvailable()) {
                                adventurer.play(true);
                                this.map.getCell(currentPositionX, currentPositionY).setAdventurer(null);
                                const treasure = nextCell.getTreasure();
                                if (treasure) {
                                    adventurer.collectTreasure();
                                    treasure.collectTreasure();
                                }
                                nextCell.setAdventurer(adventurer);
                            } else { // Adventurer cannot move to the next cell, current move is skipped.
                                adventurer.play(false);
                            }
                        } else { // Adventurer already on the cell
                            adventurer.play(false);
                        }
                    }
                }
            });
        }
    }

    getAdventurerTreasureCountList(): Adventurer[] {
        const adventurerListSortedByTreasureCount = this._adventurerList.sort((a, b) => {
            return b.getTreasureCount() - a.getTreasureCount();
        });
        adventurerListSortedByTreasureCount.forEach((adventurer) => {
            console.log(adventurer.getName() + ' : ' + adventurer.getTreasureCount() + ' trésors');
        });
        return adventurerListSortedByTreasureCount;
    }
}
