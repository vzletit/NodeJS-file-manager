import path from 'path';

export default (cwd, pathToCheck) => {
        const { root } = path.parse(cwd);
//console.log({root})
        if (['/', '\\'].includes(pathToCheck)) {return root}
        if (pathToCheck.endsWith(':') ) {return pathToCheck + path.sep}
              
        return path.isAbsolute(pathToCheck)
        ? pathToCheck
        : path.join(cwd, pathToCheck);}