"use strict";

var _ = require("lodash");
var vfs;

function prepareEnvironment(options, pVfs) {
    vfs = pVfs;
}

module.exports.prepareEnvironment = prepareEnvironment;

function readFileSync() {

}

module.exports.stub = {};
module.exports.stub.readFileSync = readFileSync;
