var crypto    = require("crypto"),
    salt      = crypto.randomBytes(10).toString("hex");

function colourize(ip) {
  return crypto.createHash("sha1").update(salt + this.author + ip.split(".").pop()).digest("hex").substring(34);
}

function Post(ip, author, title, text, thread, data) {
  this.author = author || "Anonymous";
  this.title  = title;
  this.text   = text;

  this.thread = thread || 0;
  this.count  = 0;
  this.date   = new Date();
  this.update = Date.now();

  this.colour = colourize(ip);
  this.image  = global.filestore.upload(data);

}

module.exports = Post;