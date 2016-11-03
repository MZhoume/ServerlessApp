"use strict";
function tryFind(payload, key, def) {
    if (payload.item && payload.item[key]) {
        return payload.item[key];
    }
    else if (payload.values && payload.values[key]) {
        return payload.values[key];
    }
    return def;
}
exports.tryFind = tryFind;
function genLambdaError(code, message) {
    return JSON.stringify({ code: code, message: message });
}
exports.genLambdaError = genLambdaError;
