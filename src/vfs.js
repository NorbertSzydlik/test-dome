"use strict";

var _ = require("lodash");
var assert = require("assert");

var fs = {};

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

function startEnvironment(options) {
    if(_.has(options, "fs")) {
        _.forEach(options.fs, function(file, absolutePath) {
            fs[absolutePath] = {};
            var storedFile = fs[absolutePath];
            storedFile.data = getBufferFromData(file.data);
        });
    }
}

function getDataOfFile(absolutePath, encoding) {
    if(!_.has(fs, absolutePath)) {
        assert.fail(null, null, 'Path "' + absolutePath + '" does not exist in virtual file system');
    }
    return fs[absolutePath].data.toString(encoding);
}

module.exports.startEnvironment = startEnvironment;
module.exports.getDataOfFile = getDataOfFile;
