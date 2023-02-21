import os from 'os';
import readLine from 'node:readline'
import allArgsValid from './helpers/validateArgs.js'
import parseCliArg from './helpers/parseCliArg.js';
import hash from './modules/hash.js';
import compress from './modules/compress.js'

import render from './render/render.js';
import * as nwd from './modules/nwd.js';
import * as files from './modules/files.js';
import opSys from './modules/opSys.js'

const userName = parseCliArg(process.argv.slice(2), 'username');
const defaultDir = os.userInfo().homedir
const prompt = '\x1b[36m' + '> ' + '\x1b[0m'
let currentDir = defaultDir;

// Messages
const sayHello = (userName = 'Anonymous') =>  render({renderMessage: `${os.EOL}Welcome to the File Manager, ${userName}!${os.EOL}` })
const printCurrentDir = (dir = defaultDir) => render({renderMessage: `${os.EOL}You are currently in ${dir}`})
const sayByeByeAndExit = (userName = 'Anonymous') => {
    render({renderMessage:`${os.EOL}Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`});
    process.exit();
}
const showError = () => render({renderMessage:`Invalid input`, renderType: 'error'});


const handleResults = (returnedObj) => { 
    currentDir = returnedObj?.newCwd || currentDir; 
    render(returnedObj) }

const mapCommandToFunction = {
    
    up: () => handleResults(nwd.up(currentDir)), 
    cd: async (argsArr) => handleResults(nwd.cd(currentDir, argsArr[0])),
    ls: async () => handleResults(await nwd.ls(currentDir)),
    cat: async (argsArr) => handleResults(await files.cat(currentDir, argsArr[0])),
    add: async (argsArr) => {handleResults(await files.add(currentDir, argsArr[0]))},
    rn: async (argsArr) => {handleResults(await files.rn(currentDir, argsArr[0], argsArr[1]))},
    cp: async (argsArr) => {handleResults(await files.cp(currentDir, argsArr[0], argsArr[1]))},
    mv: async (argsArr) => {handleResults(await files.mv(currentDir, argsArr[0], argsArr[1]))},
    rm: async (argsArr) => {handleResults(await files.rm(currentDir, argsArr[0]))},   
    os: (argsArr) => {handleResults(opSys(argsArr[0])) },
    hash: async (argsArr) => {handleResults(await hash(currentDir, argsArr[0]))},   
    compress: async (argsArr) => {handleResults(await compress(currentDir, argsArr[0], argsArr[1], 'compress'))},
    decompress: async (argsArr) => {handleResults(await compress(currentDir, argsArr[0], argsArr[1], 'decompress'))},
    
    '.exit': () => sayByeByeAndExit(userName),
}

export default async () => {

    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: prompt
      }); 

    
    sayHello(userName);
    process.on('SIGINT', () => sayByeByeAndExit(userName))

    printCurrentDir();    
    process.stdout.write(prompt)
    


    rl.on('line', async input => {
        const [userCommand, ...argsArr] = input
            .toString()
            .replace(os.EOL, "")
            .split(' ');
        const userArgsArr = argsArr.filter(item => item);
        
        if (Object.keys(mapCommandToFunction).includes(userCommand)
            && await allArgsValid(userCommand, userArgsArr, currentDir)) { await mapCommandToFunction[userCommand](userArgsArr); }
        else { showError() }

        printCurrentDir(currentDir);
        process.stdout.write(prompt)
    })

}