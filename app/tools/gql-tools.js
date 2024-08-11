const path = require('path');
const { readFileSync } = require('fs');

const { isAbsolute, join, dirname } = path;

function callerDirname() {
    const _ = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(2);
    Error.prepareStackTrace = _;

    const caller = stack.find(c => c.getTypeName() != null);
    return dirname(caller.getFileName());
}

const requireGql = (filepath) => {
    const realFilePath = isAbsolute(filepath) ? filepath : join(callerDirname(), filepath);
    const realFilePathWithExtension = `${realFilePath}.gql`;
    const source = readFileSync(realFilePathWithExtension).toString();
    return source;
}

module.exports = {
    requireGql
};