var crypto = require("crypto"),
    salt   = crypto.randomBytes(10).toString("hex");

function Post(ip, author, title, text, thread) {
  this.author = author || "Anonymous";
  this.colour = crypto.createHash("sha1").update(salt + this.author + ip.split(".").pop()).digest("hex").substring(34);
  this.title  = title;
  this.text   = text;
  this.thread = thread || 0;
  this.count  = 0;
  this.date   = new Date();
  this.update = this.date;
}

module.exports = Post;