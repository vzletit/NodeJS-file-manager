import fs, {promises} from 'fs';
import path from 'path';
import {pipeline} from 'stream/promises'
import pathToAbsolute from '../helpers/pathToAbsolute.js';

// ++++ CAT (Print) ++++
export const cat = async (cwd, givenPath) => {   

    const readF = new Promise((resolve) => {
        const filePath = pathToAbsolute(cwd, givenPath);
        const readFile = fs.createReadStream(filePath);
        const resultArr = []
        const errorObj = {renderType: 'error' }
        readFile.on('data', chunk => { resultArr.push(chunk) })
        readFile.on('end', () => resolve({renderMessage: resultArr.join('')}))
        readFile.on('error', () => resolve(errorObj))        
    })

return await Promise.resolve(readF);
}

// ++++ ADD (New file) ++++
export const add = async (cwd, fileName) => {   

 try {
    const filePath = pathToAbsolute(cwd, fileName);
    const newFile = await promises.open(filePath, 'wx');
          newFile.close()          
          return ({renderMessage: `File ${fileName} created`})
 }
 catch (error) { return {renderType: 'error'}}    
}

// ++++ RN (Rename) ++++
export const rn = async (cwd, oldFileName, newFileName) => {   

 try {
    const oldFilePath = pathToAbsolute(cwd, oldFileName);
    const newFilePath = pathToAbsolute(cwd, newFileName);
    await promises.rename(oldFilePath, newFilePath);
    return ({renderMessage: `File ${oldFileName} renamed to ${newFileName}`})
 }
 catch (error) { return {renderType: 'error'}}    
}


// ++++ CP (Copy) ++++
export const cp = async (cwd, givenPathToFile, givenPathToDir) => {   

        const absSrcFilePath = pathToAbsolute(cwd, givenPathToFile);
        const srcFileName = path.parse(givenPathToFile).base;
        const absTargetDirPath = pathToAbsolute(cwd, givenPathToDir);
        
        const readFile = fs.createReadStream(absSrcFilePath);
        const writeFile = fs.createWriteStream(path.join(absTargetDirPath, srcFileName));

        try {
            
        await pipeline(readFile, writeFile);
        return ({renderMessage: `File ${srcFileName} copied to ${givenPathToDir}`})
    }
        catch (err) { 
            console.log(err)
            return ({renderType: 'error'})
        }
    }

// ++++ MV (Move: copy + delete) ++++
export const mv = async (cwd, givenPathToFile, givenPathToDir) => {   

        const absSrcFilePath = pathToAbsolute(cwd, givenPathToFile);
        const srcFileName = path.parse(givenPathToFile).base;
        const absTargetDirPath = pathToAbsolute(cwd, givenPathToDir);
        
        const readFile = fs.createReadStream(absSrcFilePath);
        const writeFile = fs.createWriteStream(path.join(absTargetDirPath, srcFileName));

        try {
        await pipeline(readFile, writeFile);
        await promises.rm(absSrcFilePath);
        return ({renderMessage: `File ${srcFileName} moved to ${givenPathToDir}`})
    }
        catch { return ({renderType: 'error'})
        }
    }

// ++++ RM (delete) ++++
export const rm = async (cwd, givenPathToFile) => {   

        const absFilePath = pathToAbsolute(cwd, givenPathToFile);
        const fileName = path.parse(givenPathToFile).base;
        
        try {
        await promises.rm(absFilePath);
        return ({renderMessage: `File ${fileName} deleted`})
    }
        catch { return ({renderType: 'error'})
        }
    }
