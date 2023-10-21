import {Adventurer} from "../src/class/Adventurer";
import {Orientation} from "../src/enumsAndConstants/orientation";
import {Treasure} from "../src/class/Treasure";

describe('Adventurer', () => {

    // Adventurer can be instantiated with default values
    it('should instantiate Adventurer with default values', () => {
        const adventurer = new Adventurer('John Doe');
        expect(adventurer.getName()).toBe('John Doe');
        expect(adventurer.getTreasureCount()).toBe(0);
        expect(adventurer.getPosition()).toEqual({ x: 0, y: 0 });
        expect(adventurer.getOrientation()).toBe(Orientation.N);
        expect(adventurer.getMovementList()).toBe('');
    });

    // Adventurer can be instantiated with custom values
    it('should instantiate Adventurer with custom values', () => {
        const adventurer = new Adventurer('Jane Smith', 2, 3, Orientation.S, 'GDA');
        expect(adventurer.getName()).toBe('Jane Smith');
        expect(adventurer.getTreasureCount()).toBe(0);
        expect(adventurer.getPosition()).toEqual({ x: 2, y: 3 });
        expect(adventurer.getOrientation()).toBe(Orientation.S);
        expect(adventurer.getMovementList()).toBe('GDA');
    });

    // Adventurer can move forward in the direction it is facing
    it('should move Adventurer forward in the direction it is facing', () => {
        const adventurer = new Adventurer('John Doe', 1, 1, Orientation.N, 'AAAA');
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 1, y: 0 });
        expect(adventurer.getMovementList()).toEqual("AAA");
        adventurer.setOrientation(Orientation.S);
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 1, y: 1 });
        expect(adventurer.getMovementList()).toEqual("AA");

        adventurer.setOrientation(Orientation.E);
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 2, y: 1 });
        expect(adventurer.getMovementList()).toEqual("A");

        adventurer.setOrientation(Orientation.O);
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 1, y: 1 });
        expect(adventurer.getMovementList()).toEqual("");

    });

    // Adventurer can move to negative coordinates (Adventurer doest not know about map limitation)
    it('should not move Adventurer to a position outside the map boundaries', () => {
        const adventurer = new Adventurer('John Doe', 0, 0, Orientation.N, 'AAA');
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 0, y: -1 });
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 0, y: -2 });
        adventurer.makeNextMove();
        expect(adventurer.getPosition()).toEqual({ x: 0, y: -3 });
    });


    // Adventurer can execute an empty sequence of movements
    it('should not move Adventurer when executing an empty sequence of movements', () => {
        const adventurer = new Adventurer('John Doe', 0, 0, Orientation.N, '');

        expect(adventurer.getPosition()).toEqual({ x: 0, y: 0 });
    });

    // Adventurer can execute a sequence of invalid movements
    it('should not move Adventurer when executing a sequence of invalid movements', () => {
        const adventurer = new Adventurer('John Doe', 0, 0, Orientation.N, 'XYZ');
        // Use an expect statement to check if an error is thrown
        expect(() => adventurer.makeNextMove()).toThrow('Adventurer does not know about this movement');
    });


});
