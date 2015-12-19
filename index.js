var vfs = require("./src/vfs");

function startEnvironment(options) {
    vfs.startEnvironment(options);
}

module.exports.startEnvironment = startEnvironment;
module.exports.vfs = vfs;
