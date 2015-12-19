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

    var moduleUT = proxyquire(path.join(path.dirname(module.parent.filename), modulePath), requireStubs);
    vfs.prepareEnvironment(options);
    return moduleUT;
}

module.exports.enclose = enclose;
module.exports.vfs = vfs;
