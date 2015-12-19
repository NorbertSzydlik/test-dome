"use strict";

var _ = require("lodash");
var assert = require("assert");

var vfs = {};

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
    if(_.has(options, "vfs")) {
        _.forEach(options.vfs, function(file, absolutePath) {
            vfs[absolutePath] = {};
            var storedFile = vfs[absolutePath];
            storedFile.data = getBufferFromData(file.data);
        });
    }
}

function getDataOfFile(absolutePath, encoding) {
    if(!_.has(vfs, absolutePath)) {
        assert.fail(null, null, 'Path "' + absolutePath + '" does not exist in virtual file system');
    }
    return vfs[absolutePath].data.toString(encoding);
}

module.exports.prepareEnvironment = prepareEnvironment;
module.exports.getDataOfFile = getDataOfFile;
module.exports.fsStub = {
    readFileSync: function() {}
};

