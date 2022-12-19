import pathToAbsolute from "../../src/helpers/pathToAbsolute";

test('pathToAbsolute', () => {
expect(pathToAbsolute('C:\\Users\\dima', 'newdir')).toEqual(`C:\\Users\\dima\\newdir`);
expect(pathToAbsolute('C:\\Users\\dima', '.')).toEqual(`C:\\Users\\dima`);
expect(pathToAbsolute('C:\\Users\\dima', '..')).toEqual(`C:\\Users`);
expect(pathToAbsolute('C:\\Users\\dima', '//')).toEqual(`C:\\`);
expect(pathToAbsolute('C:\\Users\\dima', 'd:')).toEqual(`d:`);
expect(pathToAbsolute('C:\\Users\\dima', 'd:\\')).toEqual(`d:\\`);
expect(pathToAbsolute('C:\\Users\\dima', 'd:/')).toEqual(`d:/`);

})