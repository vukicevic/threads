function Datastore() {
  var vault = [];

  return {
    update: function(id) {
      var post = vault[id-1];
      
      if (post) {
        post.update = new Date();
        post.count++;
      }
    },

    get: function(id, offset, limit) {
      id     = parseInt(id) || 0;
      offset = parseInt(offset) || 0;
      limit  = parseInt(limit) + offset || undefined;

      return vault.filter(function(p) { return p.id === id || p.thread === id }).slice(offset, limit);
    },

    set: function(post) {
      if (post.thread <= vault.length) {
        post.id = vault.push(post);
      }

      return post;
    }
  }
}

module.exports = Datastore();