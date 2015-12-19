"use strict";

var vfs = require("../../src/vfs");
var expect = require("chai").expect;

describe("Virtual file system", function() {
    describe("prepareEnvironment", function() {
        it("should take `options` object argument", function() {
            expect(vfs.prepareEnvironment.length).to.equal(1);
        });
        it("allows to create initial content of files using string", function() {
            vfs.prepareEnvironment({
                vfs: {
                    "/tmp/test1.txt": {
                        data: "TestData string"
                    }
                }
            });

            expect(vfs.getDataOfFile("/tmp/test1.txt", "utf8")).to.equal("TestData string");
        });
        it("allows to create initial content of files using array buffer", function() {
            vfs.prepareEnvironment({
                vfs: {
                    "/tmp/test2.txt": {
                        data: new Buffer("0a1b2c3d4e5f", "hex")
                    }
                }
            });

            expect(vfs.getDataOfFile("/tmp/test2.txt", "hex")).to.equal("0a1b2c3d4e5f");
        });
        it("allows to create initial content using array of strings or buffers", function() {
            vfs.prepareEnvironment({
                vfs: {
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

            expect(vfs.getDataOfFile("/tmp/test1.txt", "utf8")).to.equal("this is string");
            expect(vfs.getDataOfFile("/tmp/test2.txt", "utf8")).to.equal("this is buffer");
            expect(vfs.getDataOfFile("/tmp/test3.txt", "utf8")).to.equal("this is mixed buffer & string");
        });
        it("should cleanup environment when used second time", function() {
            vfs.prepareEnvironment({
                vfs: {
                    "/tmp/test1.txt": {
                        data: "TestData string"
                    }
                }
            });
            vfs.prepareEnvironment({
                vfs: {
                    "/tmp/test2.txt": {
                        data: "TestData string"
                    }
                }
            });

            expect(function() {
                vfs.getDataOfFile("/tmp/test1.txt");
            }).to.throw;
        });
        it("should mimic `fs` module if options.enabled.vfs is true", function() {

        });
        it("should not mimic `fs` module if options.enabled.vfs is false or undefined", function() {

        });
    });
});
