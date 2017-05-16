var express = require("express");
var router = express.Router(); 
var db = require("../models/");
 
router.get("/", function(req, res) {
  db.Burger.findAll()
  .then(function(data) {
    var handleBarsObject = {burgers: data};
    res.render("index", handleBarsObject); 
  });
});

router.post("/", function(req, res) {
  db.Burger.create({name: req.body.name})
  .then(function(data) {
    res.redirect("/");
  });
});

router.put("/", function(req, res) {
    db.Burger.update({devoured: true},
    {where: {id: req.body.id}})
    .then(function(dbBurger) {
      res.redirect("/");
    });
});



// Export routes for server.js to use.
module.exports = router;
