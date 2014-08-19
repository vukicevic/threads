var fs = require("fs");

function Filestore () {
  this.path = "./static/upload";

  this.create();
}

Filestore.prototype.upload = function(name, data) {
  var matches = data.match(/^data:.+\/(.+);base64,(.*)$/),
    filename  = name + "." + matches[1];

  fs.writeFileSync(this.path + "/" + filename, new Buffer(matches[2], "base64"));

  return filename;
}

Filestore.prototype.create = function() {
  if (fs.existsSync(this.path)) {
    fs.readdirSync(this.path).forEach(function(file) { fs.unlinkSync(this.path + "/" + file) });
  } else {
    fs.mkdirSync(this.path);
  }
}

module.exports = new Filestore();