var testDome = require("../index");
var expect = require("chai").expect;
var sinon = require("sinon");

describe("testDome", function() {
    it("should have .enclose method", function() {
        expect(testDome).to.respondTo("enclose");
    });
    describe("enclose", function() {
        it("should mimic fs module if options.enabled.vfs is true", function() {
            var vfsMock = sinon.mock(testDome.vfs.fsStub);
            vfsMock.expects("readFileSync").once().withArgs("/tmp/file.txt");

            var stubModule = testDome.enclose("./fixtures/stubModule", {
                enabled: {
                    vfs: true
                }
            });

            stubModule.fs.readFileSync("/tmp/file.txt");
            vfsMock.restore();
            vfsMock.verify();
        });
        it("should not mimic fs module if options.enabled.vfs is false or undefined", function() {
            var vfsMock = sinon.mock(testDome.vfs.fsStub);
            vfsMock.expects("readFileSync").never();

            var stubModule = testDome.enclose("./fixtures/stubModule", {
                enabled: {
                    vfs: false
                }
            });

            try {
                stubModule.fs.readFileSync("/tmp/file.txt");
            } catch(e) {}

            vfsMock.restore();
            vfsMock.verify();
        });
    });
});
