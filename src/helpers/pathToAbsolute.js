import path from 'path';

export default (cwd, pathToCheck) => {
        const { root } = path.parse(cwd);

        if (pathToCheck[1] === ':') {return pathToCheck}

        return path.isAbsolute(pathToCheck)
         ? path.join(root, pathToCheck)
         : path.join(cwd, pathToCheck);}
