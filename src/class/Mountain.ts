import {Adventurer} from "./Adventurer";
import {Treasure} from "./Treasure";
import {CustomMap} from "./Map";

export class Game {
    private _adventurerList: Adventurer [];
    private _treasureList: Treasure [];
    private map: CustomMap | null;


    constructor(map?: CustomMap, adventurerList: Adventurer[] = [], treasureList: Treasure[] = []) {
        this._adventurerList = adventurerList;
        this._treasureList = treasureList;
        this.map = map ? map : null;
    }

    addAdventurer(adventurer: Adventurer) {
        if (this._adventurerList.findIndex((adv) => adv.getName() === adventurer.getName()) !== -1) {
            throw new Error('Adventurer already exists');
        } else {
            this._adventurerList.push(adventurer);
        }
    }

    hasMap(): boolean {
        return this.map !== null;
    }

    getMap() {
        return this.map;
    }
    setMap(map: CustomMap) {
        this.map = map;
    }

}
