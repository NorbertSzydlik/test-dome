var testDome = require("../../index"); //in your test write `require("test-dome")`
var expect = require("chai").expect;

describe("code", function() {
    it("should save report based on input file", function() {
        var SUT = testDome.enclose("./code", {
            vfs: {
                "/tmp/inputData.json": {
                    data: JSON.stringify([{key: "testKey1", value: "testValue1"}, {key: "testKey2", value: "testValue2"}])
                }
            },
            enabled: {
                vfs: true
            }
        });

        SUT.saveReport("/tmp/inputData.json", "/tmp/report.csv");

        expect(testDome.vfs.getDataOfFile("/tmp/report.csv", "utf8")).to.equal("testKey1|testValue1\ntestKey2|testValue2\n");
    });
});
