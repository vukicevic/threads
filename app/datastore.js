function Datastore(data) {
  this.vault = data ? JSON.parse(data) : [];
}

Datastore.prototype.update = function(id) {
  var post = this.vault[id-1];
      
  if (post) {
    post.update = Date.now();
    post.count++;
  }
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
  }

  return post;
}

Datastore.prototype.export = function() {
  return JSON.stringify(this.vault);
}

module.exports = Datastore;