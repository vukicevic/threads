function Datastore() {
  this.vault = [];
}

Datastore.prototype.update = function(id) {
  var post = this.vault[id-1];

  if (post) {
    post.update = new Date();
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

module.exports = new Datastore();