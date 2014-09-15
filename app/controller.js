var router = require("express").Router(),
    Post   = require(__dirname + "/model");

router.route("/thread/:id?/:offset?/:limit?")

  .post(function(req, res) {
    if (req.body.text) {
      var post = global.datastore.set(new Post(parseInt(req.params.id), req.body.text, req.body.author, req.body.secret, req.body.file));
      res.status(201).json(post).end();
    } else {
      res.status(400).end();
    }
  })

  .get(function(req, res) {
    var offset = parseInt(req.params.offset) || 0,
        limit = offset + parseInt(req.params.limit) || undefined;

    res.status(200).json({
      "thread": global.datastore.get(req.params.id).slice(offset, limit)
    }).end();
  })

  .delete(function(req, res) {
    global.datastore.remove(req.params.id);
    res.status(204).end();
  });


module.exports = router;