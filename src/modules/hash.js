import crypto from 'crypto';
import fs from 'fs/promises'
import pathToAbsolute from '../helpers/pathToAbsolute.js';

const hashMethod = 'sha256';

export default async (cwd, fileName) => {
    const filePath = pathToAbsolute(cwd, fileName);

    const hasher = crypto.createHash(hashMethod);
    try {
    const data = await fs.readFile(filePath)
    const hash = hasher.update(data).digest('hex');
    return ({renderMessage: `${fileName} hashed with ${hashMethod}: ${hash}`})
    }
    catch {
        return ({renderType: 'error'})
    }
}
