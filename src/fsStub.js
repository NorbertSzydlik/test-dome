"use strict";

var _ = require("lodash");
var vfs;

function prepareEnvironment(options, pVfs) {
    vfs = pVfs;
}

module.exports.prepareEnvironment = prepareEnvironment;

function readFileSync(file) {
    if(_.has(vfs, file)) {
        return vfs[file].data;
    }
}

module.exports.stub = {};
module.exports.stub.readFileSync = readFileSync;
