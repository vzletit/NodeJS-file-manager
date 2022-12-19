import validateArgs from "../../src/helpers/validateArgs.js";
import path from 'path';
import { fileURLToPath } from 'url';

const cwd = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../__fixtures__/', )
//console.log(cwd)

test('validateArgs', async () => {

expect( await validateArgs('up',[], cwd)).toBe(true);
expect( await validateArgs('up',['anypath'], cwd)).toBe(false);

expect( await validateArgs('cd',['justEmptyDir'], cwd)).toBe(true);
expect( await validateArgs('cd',['notEmptyDir/dir2'], cwd)).toBe(true);
expect( await validateArgs('cd',['fakeDir'], cwd)).toBe(false);
expect( await validateArgs('cd',[], cwd)).toBe(false);

expect( await validateArgs('ls',[], cwd)).toBe(true);
expect( await validateArgs('ls',['justEmptyDir'], cwd)).toBe(false);

expect( await validateArgs('cat',['notEmptyDir/someFile.txt'], cwd)).toBe(true);
expect( await validateArgs('cat',['justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('cat',[], cwd)).toBe(false);

expect( await validateArgs('add',['notExistedFile.txt'], cwd)).toBe(true);
expect( await validateArgs('add',['notEmptyDir/newFile.txt'], cwd)).toBe(true);
expect( await validateArgs('add',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('add',['justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('add',[], cwd)).toBe(false);
expect( await validateArgs('add',['notEmptyDir/newFile.txt', 'anemorearg'], cwd)).toBe(false);
expect( await validateArgs('add',['..'], cwd)).toBe(false);
expect( await validateArgs('add',['.'], cwd)).toBe(false);
expect( await validateArgs('add',['/'], cwd)).toBe(false);
expect( await validateArgs('add',['\\'], cwd)).toBe(false);

expect( await validateArgs('rn',['notEmptyDir/someFile.txt', 'notEmptyDir/someFile2.txt'], cwd)).toBe(true);
expect( await validateArgs('rn',['notEmptyDir/someFile.txt', 'notEmptyDir/someFile2.txt', '3rdarg'], cwd)).toBe(false);
expect( await validateArgs('rn',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('rn',['noExistedFile.txt', 'file2.txt'], cwd)).toBe(false);
expect( await validateArgs('rn',['notExistedFile.txt'], cwd)).toBe(false);
expect( await validateArgs('rn',['justEmptyDir', 'newDir'], cwd)).toBe(false);

expect( await validateArgs('cp',['notEmptyDir/someFile.txt', 'justEmptyDir'], cwd)).toBe(true);
expect( await validateArgs('cp',['notEmptyDir/someFile.txt', 'notEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('cp',['notEmptyDir/someFile.txt', 'notEmptyDir', '3rdarg'], cwd)).toBe(false);
expect( await validateArgs('cp',['notEmptyDir/someFile.txt', 'notEmptyDir/someFile2.txt'], cwd)).toBe(false);
expect( await validateArgs('cp',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('cp',['noExistedFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('cp',['justEmptyDir', 'newDir'], cwd)).toBe(false);

expect( await validateArgs('mv',['notEmptyDir/someFile.txt', 'justEmptyDir'], cwd)).toBe(true);
expect( await validateArgs('mv',['notEmptyDir/someFile.txt', 'notEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('mv',['notEmptyDir/someFile.txt', 'notEmptyDir', '3rdarg'], cwd)).toBe(false);
expect( await validateArgs('mv',['notEmptyDir/someFile.txt', 'notEmptyDir/someFile2.txt'], cwd)).toBe(false);
expect( await validateArgs('mv',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('mv',['noExistedFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('mv',['justEmptyDir', 'newDir'], cwd)).toBe(false);

expect( await validateArgs('rm',['notEmptyDir/someFile.txt'], cwd)).toBe(true);
expect( await validateArgs('rm',['notEmptyDir/someFile.txt', 'anotherarg'], cwd)).toBe(false);
expect( await validateArgs('rm',['notExistedFile.txt'], cwd)).toBe(false);
expect( await validateArgs('rm',['justEmptyDir'], cwd)).toBe(false);

expect( await validateArgs('os',['--EOL'], cwd)).toBe(true);
expect( await validateArgs('os',['--EOL', 'wowArg!'], cwd)).toBe(false);
expect( await validateArgs('os',['--HOME'], cwd)).toBe(false);
expect( await validateArgs('os',['cpus'], cwd)).toBe(false);

expect( await validateArgs('hash',['notEmptyDir/someFile.txt'], cwd)).toBe(true);
expect( await validateArgs('hash',['fakeFile.txt'], cwd)).toBe(false);
expect( await validateArgs('hash',['justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('hash',['..'], cwd)).toBe(false);
expect( await validateArgs('hash',['.'], cwd)).toBe(false);
expect( await validateArgs('hash',['/'], cwd)).toBe(false);
expect( await validateArgs('hash',['\\'], cwd)).toBe(false);

expect( await validateArgs('compress',['notEmptyDir/someFile.txt', 'newarch.zip'], cwd)).toBe(true);
expect( await validateArgs('compress',['notEmptyDir/someFile.txt', 'notEmptyDir/newarch.zip'], cwd)).toBe(true);
expect( await validateArgs('compress',['notEmptyDir/someFile.txt', '..'], cwd)).toBe(false);
expect( await validateArgs('compress',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('compress',['notEmptyDir/someFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('compress',['notEmptyDir/fakeFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('compress',['notEmptyDir', 'justEmptyDir'], cwd)).toBe(false);

expect( await validateArgs('decompress',['notEmptyDir/someFile.txt', 'unachived.txt'], cwd)).toBe(true);
expect( await validateArgs('decompress',['notEmptyDir/someFile.txt', 'notEmptyDir/unachived.txt'], cwd)).toBe(true);
expect( await validateArgs('decompress',['notEmptyDir/someFile.txt', '..'], cwd)).toBe(false);
expect( await validateArgs('decompress',['notEmptyDir/someFile.txt'], cwd)).toBe(false);
expect( await validateArgs('decompress',['notEmptyDir/someFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('decompress',['notEmptyDir/fakeFile.txt', 'justEmptyDir'], cwd)).toBe(false);
expect( await validateArgs('decompress',['notEmptyDir', 'justEmptyDir'], cwd)).toBe(false);

     })