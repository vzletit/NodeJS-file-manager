export default (args, key = '') => args
    .filter((arg) => arg.split('=')[0] === '--' + key)
    .join()
    .split('=')[1];
    