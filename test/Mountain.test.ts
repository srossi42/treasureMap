import {Mountain} from "../src/class/Mountain";

describe('Mountain', () => {

    // Mountain can be instantiated with default values
    it('should instantiate Mountain with default values', () => {
        const mountain = new Mountain(1,1);
        expect(mountain.getPosition()).toEqual({ x: 1, y: 1 });
    });

});
