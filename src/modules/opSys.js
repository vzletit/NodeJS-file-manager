import os from 'os';

export default (arg) => {

const renderCpuInfo = () => {
    const cpusNum = os.cpus().length;
   
    const cpuInfoArr = os.cpus()
    .map((cpu, i) => `---${os.EOL}CPU #${i}: ${cpu.model}.${os.EOL}(Clock rate is ${cpu.speed / 1000} GHz)${os.EOL}`)
    .join('')
    return `${os.EOL}Total ${cpusNum} CPUs:${os.EOL}${cpuInfoArr}`;
}

const mapArgToFun = {
        '--EOL': () => JSON.stringify(os.EOL),
        '--cpus': () => renderCpuInfo(),
        '--homedir': () => process.env.USERPROFILE,
        '--username': () => process.env.USERNAME,
        '--architecture': () => os.arch(),
    }
    
    
return ({renderMessage: mapArgToFun[arg]()});   
}

