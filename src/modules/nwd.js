import fs from 'fs/promises';
import path from 'path';
import pathToAbsolute from '../helpers/pathToAbsolute.js';

// ++++ UP (..) ++++
export const up = (cwd) => ({ newCwd: path.parse(cwd).dir })

// ++++ CD (Change dir) ++++
export const cd = (cwd, newCwd) => ({ newCwd: pathToAbsolute(cwd, newCwd) })

// ++++ ls (Dir contents) ++++
export const ls = async (cwd) => {
    const dirContArr = await fs.readdir(cwd)
    const readStats = dirContArr.map(item => {
    const fullPathToItem = path.join(cwd, item);

        return new Promise(async (resolve) => {
            try {
                const stat = await fs.lstat(fullPathToItem);
                resolve({ Name: item, Type: stat.isDirectory() ? 'directory' : 'file' })
            }
            catch { resolve(null) }
        })
    }
    )
    const renderMessage = await Promise.all(readStats)
        .then(arr => arr.filter(item => item))
        .then(arr => arr.sort((a, b) => (a.Type > b.Type) ? 1 : (a.Type < b.Type) ? -1 : 0))
    return ({ renderMessage, renderType: 'table' })
}