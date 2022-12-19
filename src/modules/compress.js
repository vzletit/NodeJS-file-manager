import fs from 'fs';
import zlib from 'zlib';
import pathToAbsolute from "../helpers/pathToAbsolute.js"
import { pipeline } from 'stream/promises';


export default async (cwd, srcFilename, destFileName, mode = 'compress') => {
    const pathToSrcFile = pathToAbsolute(cwd, srcFilename);
    const pathToDestFile = pathToAbsolute(cwd, destFileName);
    
    const readFile = fs.createReadStream(pathToSrcFile);
    const writeFile = fs.createWriteStream(pathToDestFile);
    
    const brotli = mode === 'compress' 
    ? zlib.createBrotliCompress() 
    : zlib.createBrotliDecompress();
    
    try  {          
    await pipeline(readFile, brotli, writeFile);      
    return ({renderMessage: `${srcFilename} ${mode === 'compress' ? 'compressed' : 'decompressed'} to ${destFileName} with Brotli algorithm`})
    }
    catch {return({renderType: 'error'})}
}


