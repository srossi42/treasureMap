import { checkFormat } from '../src/utils/formatValidator';
describe('checkFormat function', () => {
    it('should return true for a valid format', () => {
        const validFormatLine = 'C - 3 - 4';
        expect(checkFormat(validFormatLine)).toBe(true);
    });

    it('should return true for a valid format', () => {
        const validFormatLine = 'A - Lara - 1 - 1 - S - AADADAGGA';
        expect(checkFormat(validFormatLine)).toBe(true);
    });
    it('should return true for a valid format', () => {
        const validFormatLine = 'T - 1 - 3 - 3';
        expect(checkFormat(validFormatLine)).toBe(true);
    });
    it('should return true for a valid format', () => {
        const validFormatLine = '###################';
        expect(checkFormat(validFormatLine)).toBe(true);
    });
    it('should return true for a valid format', () => {
        const validFormatLine = '# Ceci est un 1er commentaire';
        expect(checkFormat(validFormatLine)).toBe(true);
    });
    it('should return true for a valid format', () => {
        const validFormatLine = 'M - 2 - 1';
        expect(checkFormat(validFormatLine)).toBe(true);
    });

    it('should return false for an invalid format', () => {
        const invalidFormatLine = 'Invalid Format';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });
    it('should return false for an invalid format', () => {
        const invalidFormatLine = '';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });

    it('should return false for an invalid format', () => {
        const invalidFormatLine = 'Z - 2 - 3';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });
    it('should return false for an invalid format', () => {
        const invalidFormatLine = 'M - 2 - 1 - 4';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });    it('should return false for an invalid format', () => {
        const invalidFormatLine = 'C-2-3';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });
    it('should return false for an invalid format', () => {
        const invalidFormatLine = 'A - Lara - 1 - 1 - S - AADADAEGGA';
        expect(checkFormat(invalidFormatLine)).toBe(false);
    });

});

