var crypto = require("crypto"),
    salt   = "ThisIsWhereTheSaltShouldBeDefined123";

function colourize(author, secret) {
  return crypto.createHash("sha1").update(salt + author + secret).digest("hex").substring(34);
}

function Post(thread, title, text, author, secret) {
  this.title  = title;
  this.text   = text;

  this.thread = thread || 0;
  this.count  = 0;
  this.date   = new Date();
  this.update = Date.now();

  if (author) {
    this.author = author;
    this.colour = colourize(author, secret);
  } else {
    this.author = "Anonymous";
    this.colour = "fff";
  }
}

module.exports = Post;