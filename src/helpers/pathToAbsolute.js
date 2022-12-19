import path from 'path';

export default (cwd, pathToCheck) => {
        const { root } = path.parse(cwd);

        if (pathToCheck[1] === ':') {return pathToCheck}
           
        console.log({root, cwd, pathToCheck,abs: path.isAbsolute(pathToCheck), return: path.join(cwd, pathToCheck) })

        return path.isAbsolute(pathToCheck)
         ? path.join(root, pathToCheck)
         : path.join(cwd, pathToCheck);}
