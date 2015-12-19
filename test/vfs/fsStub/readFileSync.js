var vfs = require("../../../src/vfs");
var expect = require("chai").expect;

describe("fsStub", function() {
    it("should have readFileSync method", function() {
        expect(vfs.fsStub).to.respondTo("readFileSync");
    });
    describe("readFileSync", function() {
        it("should read from file in vfs", function() {
            var testData = new Buffer("test data");
            vfs.prepareEnvironment({
                vfs: {
                    "/tmp/test.txt": {
                        data: testData
                    }
                }
            });
            expect(vfs.fsStub.readFileSync("/tmp/test.txt")).to.deep.equal(testData);
        });
    });
});
