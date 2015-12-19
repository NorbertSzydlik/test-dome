"use strict";

var vfs = require("./src/vfs");
var path = require("path");
var proxyquire = require("proxyquire").noCallThru();
var _ = require("lodash");

function enclose(modulePath, options) {
    var requireStubs = {};
    if(_.has(options, "enabled")) {
        if(options.enabled.vfs) {
            requireStubs.fs = vfs.fsStub;
        }
    }

    var moduleUT = require(path.join(path.dirname(module.parent.filename), modulePath));
    vfs.prepareEnvironment(options);
    return moduleUT;
}

module.exports.enclose = enclose;
module.exports.vfs = vfs;
