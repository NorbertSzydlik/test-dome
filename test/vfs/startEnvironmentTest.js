var testDome = require("../../index.js");
var expect = require("chai").expect;

describe("startEnvironment", function() {
    it("should take `options` object argument", function() {
        expect(testDome.startEnvironment.length).to.equal(1);
    });
    it("allows to create initial content of files using string", function() {
        testDome.startEnvironment({
            fs: {
                "/tmp/test1.txt": {
                    data: "TestData string"
                }
            }
        });

        expect(testDome.vfs.getDataOfFile("/tmp/test1.txt")).to.equal("TestData string");
    });
    it("allows to create initial content of files using array buffer", function() {
        testDome.startEnvironment({
            fs: {
                "/tmp/test2.txt": {
                    data: new Buffer("0a1b2c3d4e5f", "hex")
                }
            }
        });

        expect(testDome.vfs.getDataOfFile("/tmp/test2.txt", "hex")).to.equal("0a1b2c3d4e5f");
    });
    it("allows to create initial content using array of strings or buffers", function() {
        testDome.startEnvironment({
            fs: {
                "/tmp/test1.txt": {
                    data: ["this ", "is ", "string"]
                },
                "/tmp/test2.txt": {
                    data: [new Buffer("this "), new Buffer("is "), new Buffer("buffer")]
                },
                "/tmp/test3.txt": {
                    data: [new Buffer("this "), "is ", new Buffer("mixed buffer & string")]
                }
            }
        });

        expect(testDome.vfs.getDataOfFile("/tmp/test1.txt")).to.equal("this is string");
        expect(testDome.vfs.getDataOfFile("/tmp/test2.txt")).to.equal("this is buffer");
        expect(testDome.vfs.getDataOfFile("/tmp/test3.txt")).to.equal("this is mixed buffer & string");
    });
    it("should cleanup environment when used second time", function() {
        testDome.startEnvironment({
            fs: {
                "/tmp/test1.txt": {
                    data: "TestData string"
                }
            }
        });
        testDome.startEnvironment({
            fs: {
                "/tmp/test2.txt": {
                    data: "TestData string"
                }
            }
        });

        expect(function() {
            testDome.vfs.getDataOfFile("/tmp/test1.txt");
        }).to.throw;
    });
});
