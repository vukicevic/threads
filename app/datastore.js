var fs = require("fs");

function Datastore(id) {
  this.id = id;
  this.import();
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

Datastore.prototype.get = function(id, offset, limit) {
  id     = parseInt(id) || 0;
  offset = parseInt(offset) || 0;
  limit  = parseInt(limit) + offset || undefined;

  return this.vault.filter(function(p) { return p.id === id || p.thread === id }).slice(offset, limit);
}

Datastore.prototype.set = function(post) {
  if (post.thread <= this.vault.length) {
    post.id = this.vault.push(post);

    this.update(post.thread);
  }

  return post;
}

Datastore.prototype.export = function() {
  fs.writeFileSync("filestore/" + this.id + ".json", JSON.stringify(this.vault));
}

Datastore.prototype.import = function() {
  try {
    this.vault = JSON.parse(fs.readFileSync("filestore/" + this.id + ".json", "utf-8"));
  } catch (e) {
    this.vault = [];
  }
}

module.exports = Datastore;