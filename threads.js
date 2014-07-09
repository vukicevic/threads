var express = require("express"),
    app     = express(),
    port    = process.env.PORT || 3000,
    parser  = require("body-parser"),
    crypto  = require("crypto"),
    salt, router, store;

crypto.randomBytes(10, function(err, buf) { salt = buf.toString("hex") });

app.use(parser());

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

router = express.Router();
store  = Datastore();

router.route("/thread/:id/:offset?/:limit?")

  .post(function(req, res) {
    if (req.body.text) {
      res.status(201).json(store.set(new Post(req.ip, req.body.author, req.body.title, req.body.text, parseInt(req.params.id), req.body.image)));
      store.update(parseInt(req.params.id));
    } else {
      res.send(400);
    }
  })

  .get(function(req, res) {
    res.json({ 
      "thread": store.get(req.params.id, req.params.offset, req.params.limit)
    });
  });

app.use("/api", router);
app.use(express.static(__dirname + "/static"));
app.listen(port);