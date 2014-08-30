var router = require("express").Router(),
    Post   = require(__dirname + "/model");

router.route("/thread/:id/:offset?/:limit?")

  .post(function(req, res) {
    if (req.body.text) {
      var post = global.datastore.set(new Post(parseInt(req.params.id), req.body.title, req.body.text, req.body.author, req.body.secret));
      res.status(201).json(post).end();
    } else {
      res.status(400).end();
    }
  })

  .get(function(req, res) {
    res.status(200).json({ 
      "thread": global.datastore.get(req.params.id, req.params.offset, req.params.limit)
    }).end();
  })

  .delete(function(req, res) {
    global.datastore.remove(req.params.id);
    res.status(204).end();
  });


module.exports = router;