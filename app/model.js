var crypto = require("crypto"),
    salt   = "abcTestSalt1234";

function colourize(author, secret) {
  return crypto.createHash("sha1").update(salt + author + secret).digest("hex").substring(34);
}

function Post(thread, title, text, author, secret, file) {
  this.title  = title;
  this.text   = text;

  this.thread = thread || 0;
  this.count  = 0;
  this.date   = new Date();
  this.update = Date.now();

  this.author = author || "Anonymous";

  this.colour = colourize(author, secret);
  this.image  = global.filestore.upload(file);
}

module.exports = Post;