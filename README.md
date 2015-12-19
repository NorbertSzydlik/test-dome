# Installation #
To install test dome use command `npm install --save-dev test-dome`. It is recommended to use TestDome with mocha framework.

# Introduction #
TestDome is library that currently stubs `fs` module. It should behave exactly like node.js module, but without operating on actual file system.

## Usage ##
First `require("testDome");` module in your test case. In your test step enclose your module under test with `testDome.enclose(pathToModule, options);`.
In mocha framework it will automatically `.release` system modules, but in other frameworks (like nodeunit) you may do it manually.

### Example test file
    var testDome = require("test-dome");
    var expect = require("chai").expect;
    
    describe("Your code", function() {
        it("should hello world in file at specified path", function() {
            var codeUT = testDome.enclose("./pathToCode", {
                enabled: {
                    vfs: true
                }
            });
            codeUT.writeHello("/tmp/helloWorld.txt");
            
            expect(testDome.vfs.getDataOfFile("/tmp/helloWorld.txt", "utf8")).to.equal("Hello World!");
        });
    });


# Roadmap #
## Current step ##
My current target is to mimic whole `fs` module and test it against external libraries like `fs-extra`, `q`, `bluebird`
## Next Steps ##
* Allow to use proxyquire and zurvan for checking against time
* Mimic `http` module
* Mimic `net` module
* Mimic `child_process` module
* Add good mocking solution
