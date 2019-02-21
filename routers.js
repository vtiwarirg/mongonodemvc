const fs = require("fs");
module.exports = function (app) {
    fs.readdirSync("./server/routes").forEach(function (file) {
        if (file.substr(-3) == ".js") {
            require("./server/routes/" + file)(app);
        }
    });
};