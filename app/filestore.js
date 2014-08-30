var fs = require("fs");

function Filestore () {}

Filestore.prototype.save = function(data) {
  fs.writeFileSync("export.json", data);
}

Filestore.prototype.load = function() {
  if (fs.existsSync("export.json")) {
    return fs.readFileSync("export.json", "utf-8");
  }
}

module.exports = Filestore;