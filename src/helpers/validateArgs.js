import path from 'path';
import fs from 'fs/promises';
import pathToAbsolute from './pathToAbsolute.js';

export default async (type, argsArr, cwd ) => {

    const argsNum = (count) => argsArr.length === count;

    const fileExist = async (givenPath) => {                    
        try {
            const absPath = pathToAbsolute(cwd, givenPath);
            const dir = await fs.stat(absPath);
            return dir.isFile();
            }
            catch {return false}
    }

    const fileNotExist = async (givenPath) => !(await fileExist(givenPath))
    
    const fileNotExistInDir = async (pathToFile, pathToDir) => {
        const fileName = path.parse(pathToFile).base;        
        const pathToCheck = path.join(pathToDir, fileName);
        return !(await fileExist(pathToCheck))}

    const dirExist = async (givenPath) => {                    
        if (['.', '..', '/', '\\'].includes(givenPath)) {return true}
        
        try {
        const absPath = pathToAbsolute(cwd, givenPath);
        const dir = await fs.stat(absPath);
        return dir.isDirectory();
        }
        catch {return false}        
    }
    
        
       
    
    const mapSchemaToType = {
        
        up: () => argsNum(0),
        cd: async () => argsNum(1) && await dirExist(argsArr[0]),
        ls: () => argsNum(0),
        cat: async () => argsNum(1) && await fileExist(argsArr[0]),
        add: async () => argsNum(1) && await fileNotExist(argsArr[0]),
        rn: async () => argsNum(2) && await fileExist(argsArr[0]) && await fileNotExist(argsArr[1]),
        cp: async () => argsNum(2) && await fileExist(argsArr[0]) && await dirExist(argsArr[1]) && fileNotExistInDir(argsArr[0], argsArr[1]),
        mv: async () => argsNum(2) && await fileExist(argsArr[0]) && await dirExist(argsArr[1]) && fileNotExistInDir(argsArr[0], argsArr[1]),        
        rm: async () => argsNum(1) && await fileExist(argsArr[0]),        
        os: () => argsNum(1) && ['--EOL', '--cpus', '--homedir', '--username', '--architecture'].includes(argsArr[0]),
        hash: async () => argsNum(1) && await fileExist(argsArr[0]),
        compress: async () => argsNum(2) && await fileExist(argsArr[0]) && await fileNotExist(argsArr[1]),
        decompress: async () => argsNum(2) && await fileExist(argsArr[0]) && await fileNotExist(argsArr[1]),
        '.exit': () => true,
        //test: async () => {},
    }

    return mapSchemaToType[type](argsArr)
}