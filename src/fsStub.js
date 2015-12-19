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

function writeFileSync(file, data, options) {
    if(_.isString(options)) {
        options = {
            encoding: options
        };
    } else if(options == null) {
        options = {
            encoding: "utf8"
        }
    }
    if(_.isString(data)) {
        data = new Buffer(data, options.encoding);
    }
    if(!_.has(vfs, file)) {
        vfs[file] = {};
        vfs[file].data = data;
    }
}

module.exports.stub = {};
module.exports.stub.readFileSync = readFileSync;
module.exports.stub.writeFileSync = writeFileSync;

