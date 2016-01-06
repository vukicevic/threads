var crypto = require("crypto");
var salt   = crypto.randomBytes(10).toString("hex");

function Post(ip, title, text, thread) {
  this.colour = crypto.createHash("sha1").update(salt + thread + ip.split(".").pop() + thread).digest("hex").substring(34);
  this.title  = title;
  this.text   = text;
  this.thread = thread || 0;
  this.count  = 0;
  this.date   = new Date();
  this.update = this.date;
}

module.exports = Post;