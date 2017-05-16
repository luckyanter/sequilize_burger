var express = require("express");
var router = express.Router(); 
var burger = require("../models/burger.js");
 
router.get("/", function(req, res) {
  burger.all(function(data) {
    var handleBarsObject = {burgers: data};
    // console.log(handleBarsObject);
    res.render("index", handleBarsObject); 
  });
});

router.post("/", function(req, res) {
  burger.create(["name", "devoured"],[req.body.name, req.body.devoured], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({devoured: req.body.devoured}, condition, function() {
    res.redirect("/");
  });
});



// Export routes for server.js to use.
module.exports = router;
