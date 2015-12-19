var fs = require("fs");

module.exports.saveReport = function(inputPath, reportPath) {
    var input = fs.readFileSync(inputPath);
    input = JSON.parse(input);

    var report = "";
    if(Array.isArray(input)) {
        input.forEach(function(record) {
            report += record.key + "|" + record.value + "\n";
        });
    }
    fs.writeFileSync(reportPath, report);
};
