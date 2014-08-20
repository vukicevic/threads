var fs     = require("fs"),
    crypto = require("crypto"),
    path   = "./static/upload";

if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

function Filestore () {}

Filestore.prototype.upload = function(data) {
  var allow = {"data:image/png;base64": "png", "data:image/gif;base64": "gif", "data:image/jpeg;base64": "jpg", "data:image/jpg;base64": "jpg"},
      split = data.split(','), filename;

  if (split[0] in allow) {
    filename = crypto.randomBytes(8).toString("hex") + "." + allow[split[0]];

    fs.writeFile(path + "/" + filename, new Buffer(split[1], "base64"), function(){});
  }  

  return filename;
}

Filestore.prototype.save = function(data) {
  fs.writeFileSync("export.json", data);
}

Filestore.prototype.load = function() {
  if (fs.existsSync("export.json")) {
    return fs.readFileSync("export.json", "utf-8");
  }
}

module.exports = Filestore;