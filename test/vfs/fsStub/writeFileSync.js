var vfs = require("../../../src/vfs");
var expect = require("chai").expect;

describe("fsStub", function() {
    it("should have writeFileSync method", function() {
        expect(vfs.fsStub).to.respondTo("writeFileSync");
    });
    describe("writeFileSync", function() {
        it("should write to file in vfs", function() {
            var testData = new Buffer("test data");
            vfs.prepareEnvironment({
                vfs: {}
            });

            vfs.fsStub.writeFileSync("/tmp/test.txt", "Test data", "utf8");
            expect(vfs.getDataOfFile("/tmp/test.txt", "utf8")).to.equal("Test data");
        });
    });
});
