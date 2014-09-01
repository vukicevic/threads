var fs = require("fs");

function Datastore(name) {
  this.name  = name;
  this.path  = "static/upload/" + name;
  this.vault = [];
  //this.import();

  if (fs.existsSync(this.path)) {
    fs.readdirSync(this.path).forEach(function(filename) { fs.unlink(this.path + "/" + filename) }, this);
  } else {
    fs.mkdirSync(this.path);
  }
}

Datastore.prototype.update = function(id) {
  var post = this.vault[id-1];
      
  if (post) {
    post.update = Date.now();
    post.count++;
  }
}

Datastore.prototype.remove = function(id) {
  this.vault.splice(id-1, 1);
}

Datastore.prototype.get = function(id) {
  id = parseInt(id) || 0;

  return this.vault.filter(function(p) { return p.id === id || p.thread === id });
}

Datastore.prototype.set = function(post) {
  if (post.thread <= this.vault.length) {
    post.id = this.vault.push(post);

    this.upload(post);
    this.update(post.thread);
  }

  return post;
}

Datastore.prototype.upload = function(post) {
  var allow = { "data:image/png;base64": "png", "data:image/gif;base64": "gif", "data:image/jpeg;base64": "jpg", "data:image/jpg;base64": "jpg" };
  
  if (post.image) {
    var data = post.image.split(',');

    if (data[0] in allow) {
      post.image = post.id + "." + allow[data[0]];

      fs.writeFile(this.path + "/" + post.image, new Buffer(data[1], "base64"), function() {});
    } else {
      post.image = false;
    }
  }
}

Datastore.prototype.export = function() {
  fs.writeFileSync(this.path + "/" + this.name + ".json", JSON.stringify(this.vault));
}

Datastore.prototype.import = function() {
  try {
    this.vault = JSON.parse(fs.readFileSync(this.path + "/" + this.name + ".json", "utf-8"));
  } catch (e) {
    this.vault = [];
  }
}

module.exports = Datastore;