
const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // 使用24小時制
};

const timeString = new Date().toLocaleString('en-US', options).replace(',', '');

function debugLogheader(currentFunction) {
    return ` - ${timeString} | (DEBUG:${currentFunction}) : `;
}

global.debugLogheader = debugLogheader;