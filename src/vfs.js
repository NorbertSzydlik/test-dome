"use strict";

var _ = require("lodash");
var assert = require("assert");
var fsStub = require("./fsStub");

var vfs;

function getBufferFromData(data) {
    if(Buffer.isBuffer(data)) {
        return data
    } else if(typeof data === "string" || data instanceof String) {
        return new Buffer(data);
    } else if(Array.isArray(data)) {
        var arrayOfBuffers = _.map(data, function(dataChunk) {
            return getBufferFromData(dataChunk);
        });
        return Buffer.concat(arrayOfBuffers);
    } else {
        throw new TypeError(absolutePath + " has unsupported type");
    }
}

function prepareEnvironment(options) {
    vfs = {};
    if(_.has(options, "enabled") && options.enabled.vfs) {
        var fs = require("fs");

        fs.__originalFunctions = {};
        _.forEach(fsStub.stub, function(stubFunction, functionName) {
            fs.__originalFunctions[functionName] = fs[functionName];
            fs[functionName] = stubFunction;
        });
    }
    if(_.has(options, "vfs")) {
        _.forEach(options.vfs, function(file, absolutePath) {
            vfs[absolutePath] = {};
            var storedFile = vfs[absolutePath];
            storedFile.data = getBufferFromData(file.data);
        });
    }
    fsStub.prepareEnvironment(options, vfs);
}

function getDataOfFile(absolutePath, encoding) {
    if(!_.has(vfs, absolutePath)) {
        assert.fail(null, null, 'Path "' + absolutePath + '" does not exist in virtual file system');
    }
    if(encoding != null) {
        return vfs[absolutePath].data.toString(encoding);
    } else {
        return  vfs[absolutePath].data;
    }

}

module.exports.prepareEnvironment = prepareEnvironment;
module.exports.getDataOfFile = getDataOfFile;
module.exports.fsStub = fsStub.stub;

