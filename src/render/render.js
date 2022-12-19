const colors = {
    default: '\x1b[0m',
    red: '\x1b[31m',
}

export default ({ 
    renderMessage = '',
    renderType = 'log' 
}) => {        
    console[renderType]( renderType === 'error' 
    ? colors.red + (renderMessage || 'Operation failed') +'\r\n' + colors.default
    : renderMessage
    );
}