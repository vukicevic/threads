var fs     = require("fs"),
    crypto = require("crypto");

function Filestore () {
  this.path = "./static/upload";

  this.create();
}

Filestore.prototype.upload = function(data) {
  var allow = {"data:image/png;base64": "png", "data:image/gif;base64": "gif", "data:image/jpeg;base64": "jpg", "data:image/jpg;base64": "jpg"},
      split = data.split(','), filename;

  if (split[0] in allow) {
    filename = crypto.randomBytes(8).toString("hex") + "." + allow[split[0]];

    fs.writeFile(this.path + "/" + filename, new Buffer(split[1], "base64"), function(){});
  }  

  return filename;
}

Filestore.prototype.create = function() {
  if (!fs.existsSync(this.path)) {
    fs.mkdirSync(this.path);
  }
}

module.exports = new Filestore();