import {CustomMap} from "../src/class/Map";
import {Mountain} from "../src/class/Mountain";

describe('CustomMap', () => {

    // CustomMap can be instantiated with default values
    it('should instantiate CustomMap with default values', () => {
        const map = new CustomMap();
        expect(map.getWidth()).toBe(0);
        expect(map.getHeight()).toBe(0);
    });

    // CustomMap can be instantiated with Width and Height values
    it('should instantiate CustomMap with default values', () => {
        const map = new CustomMap(10, 5);
        expect(map.getWidth()).toBe(10);
        expect(map.getHeight()).toBe(5);
    });


    it('should create a mountain and return it', () => {
        const map = new CustomMap(10, 5);

        let mountainList = map.getMountainList();
        expect(mountainList.length).toBe(0);
        const mountain = new Mountain(1, 1);
        map.addMountain(mountain);
        mountainList = map.getMountainList();
        expect(mountainList.length).toBe(1);
    });


});
