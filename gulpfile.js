var gulp = require("gulp");
var mocha = require("gulp-mocha");

gulp.task("mocha", function() {
    return gulp.src(["test/**/*Test.js", "test/**/*_test.js"], { read: false })
        .pipe(mocha({
            reporter: "spec"
        }));
});

gulp.task("test", ["mocha"]);
